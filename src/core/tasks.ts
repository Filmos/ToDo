import { ref as dbref, remove, onValue, set } from "firebase/database";
import { db, getUserUID, onceLoggedIn } from './database';
import { ref, watch, type Ref } from 'vue';
import { getStorage, ref as storeref, getDownloadURL, deleteObject } from "firebase/storage";

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
    hasImage?: boolean;
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

function deleteTask(task: Task) {
    const userUID = getUserUID();
    if (!userUID) {
        alert('Please sign in first!');
        return;
    }

    remove(dbref(db, `tasks/${userUID}/${task.uid}`));
    if (task.hasImage) {
        const storage = getStorage();
        deleteObject(storeref(storage, `images/tasks/${userUID}/${task.uid}.jpg`));
    }
}

function getImage(task: Ref<Task>) {
    const returnUrl: Ref<string | undefined> = ref(undefined);

    watch(task, () => {
        if (!task.value.hasImage) {
            returnUrl.value = undefined;
            return
        }

        const userUID = getUserUID();
        if (!userUID) {
            alert('Please sign in first!');
            return;
        }

        const storage = getStorage();
        getDownloadURL(storeref(storage, `images/tasks/${userUID}/${task.value.uid}.jpg`)).then((url) => {
            returnUrl.value = url;
        }).catch((error) => { })
    }, { immediate: true })

    return returnUrl;
}

export { createTask, shuffledTasks, defaultTask, deleteTask, getImage };