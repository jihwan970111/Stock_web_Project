import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBYqxrEC6WAtCiZIrPoarYSRMWckDRr_ew",
  authDomain: "react-chat-3bf1b.firebaseapp.com",
  projectId: "react-chat-3bf1b",
  storageBucket: "react-chat-3bf1b.appspot.com",
  messagingSenderId: "727130700358",
  appId: "1:727130700358:web:363cc4aeb2c9d2dbf86847"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { db, firebase };
