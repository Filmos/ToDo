import { getDatabase } from "firebase/database";
import firebase from "firebase/compat/app";
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/compat/auth';

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


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('user is logged in', user);
    } else {
        console.log('user is not logged in');
    }
})


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
function signOutUser() {
    firebase.auth().signOut();
}
function requireLogin() {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = '/auth';
        }
    })
}

export { makeAuthUI, signOutUser, requireLogin };