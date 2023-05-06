import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDXmtJRsurbjKAZNUmr9D1ULiB7F3R6ieQ",
  authDomain: "ai-todo-list.firebaseapp.com",
  databaseURL: "https://ai-todo-list.firebaseio.com",
  projectId: "ai-todo-list",
  storageBucket: "ai-todo-list.appspot.com",
  messagingSenderId: "845753832501",
  appId: "1:845753832501:web:8235c5beb77fe5aa3fcd7c",
  measurementId: "G-P4Y317D5BJ"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase();
export default db;