// src/firebase.js

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeP-OKURQn9w09xAwmTO7AWdiH9YCPHso",
    authDomain: "react-phonebook-c1f3e.firebaseapp.com",
    databaseURL: "https://react-phonebook-c1f3e.firebaseio.com",
    projectId: "react-phonebook-c1f3e",
    storageBucket: "react-phonebook-c1f3e.appspot.com",
    messagingSenderId: "53683243345",
    appId: "1:53683243345:web:44248474f13055c1e1eb70"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const firebaseWithoutParenthesis = firebase.firestore;