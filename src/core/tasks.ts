import { ref, set } from "firebase/database";
import { db, getUserUID } from './database';

function createTask(task: string) {
    const userUID = getUserUID();
    if (!userUID) {
        alert('Please sign in first!');
        return;
    }

    const taskUID = Date.now().toString();
    set(ref(db, `tasks/${userUID}/${taskUID}`), { task: task });
}
export { createTask };