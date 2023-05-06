import { ref as dbref, remove, onValue, set } from "firebase/database";
import { db, getUserUID, onceLoggedIn } from './database';
import { ref, type Ref } from 'vue';

function createTask(task: string) {
    const userUID = getUserUID();
    if (!userUID) {
        alert('Please sign in first!');
        return;
    }

    const taskUID = Date.now().toString();
    set(dbref(db, `tasks/${userUID}/${taskUID}`), { task: task });
}

interface Task {
    task: string;
    uid: string;
    quote?: string;
    props?: { [name: string]: string };
}
const shuffledTasks: Ref<Task[]> = ref([]);
onceLoggedIn(() => {
    const userUID = getUserUID();

    onValue(dbref(db, `tasks/${userUID}`), (snapshot) => {
        const data = snapshot.val() || {};
        const tasks = Object.keys(data).map((key) => {
            return {
                ...data[key],
                uid: key
            }
        });
        shuffledTasks.value = shuffleTasks(tasks);
    });

})
function shuffleTasks(tasks: Task[]) {
    return tasks.sort((a, b) => a.uid > b.uid ? 1 : -1);
}

const defaultTask = {
    props: {
        "Difficulty": "Unknown",
        "Time": "Unknown"
    }
}

function deleteTask(taskUID: string) {
    const userUID = getUserUID();
    if (!userUID) {
        alert('Please sign in first!');
        return;
    }

    remove(dbref(db, `tasks/${userUID}/${taskUID}`));
}

export { createTask, shuffledTasks, defaultTask, deleteTask };