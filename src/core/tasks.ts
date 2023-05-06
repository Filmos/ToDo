import { ref as dbref, get, onValue, set } from "firebase/database";
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
}
const shuffledTasks: Ref<Task[]> = ref([]);
onceLoggedIn(() => {
    const userUID = getUserUID();

    onValue(dbref(db, `tasks/${userUID}`), (snapshot) => {
        const data = snapshot.val() || {};
        const tasks = Object.keys(data).map((key) => {
            return {
                task: data[key].task,
                uid: key
            }
        });
        shuffledTasks.value = tasks;
    });

})

export { createTask, shuffledTasks };