import { getDatabase } from "firebase/database";
import firebase from "firebase/compat/app";
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/compat/auth';
import { ref } from 'vue';

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
const app = firebase.initializeApp(firebaseConfig);


const db = getDatabase();
export { db };



const authUI = new firebaseui.auth.AuthUI(firebase.auth());
const authConfig = {
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/'
}
function makeAuthUI(targetDiv: string) {
    authUI.start(targetDiv, authConfig);
}
function signOut() {
    firebase.auth().signOut();
}
function requireLogin() {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = '/auth';
        }
    })
}
function getUserUID() {
    return firebase.auth().currentUser?.uid;
}

let isLoggedIn = ref(false);
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        isLoggedIn.value = true;
    } else {
        isLoggedIn.value = false;
    }
})

export { makeAuthUI, signOut, requireLogin, getUserUID, isLoggedIn };