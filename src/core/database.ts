import { getDatabase } from "firebase/database";
import firebase from "firebase/compat/app";
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/compat/auth';
import { ref } from 'vue';

const firebaseConfig = {
    apiKey: "AIzaSyBgesDR8BboHV2pqIRfcOYsQ-QTGhLz6ek",
    authDomain: "shufflify-ai.firebaseapp.com",
    databaseURL: "https://shufflify-ai-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shufflify-ai",
    storageBucket: "shufflify-ai.appspot.com",
    messagingSenderId: "796055567642",
    appId: "1:796055567642:web:b0bd35a32a0f0b660b00a3"
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

let onLogin: Function[] = [];
let isLoggedIn = ref(false);
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        isLoggedIn.value = true;
        onLogin.forEach((callback) => {
            callback();
        })
        onLogin = [];
    } else {
        isLoggedIn.value = false;
    }
})

function onceLoggedIn(callback: Function) {
    onLogin.push(callback);
}

export { makeAuthUI, signOut, requireLogin, getUserUID, onceLoggedIn, isLoggedIn };