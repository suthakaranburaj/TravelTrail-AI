// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA8xc6bxOuSMb8xuDlMqvsDHj6ItK0sAG0",
    authDomain: "traveltrail-ai.firebaseapp.com",
    projectId: "traveltrail-ai",
    storageBucket: "traveltrail-ai.firebasestorage.app",
    messagingSenderId: "483973045641",
    appId: "1:483973045641:web:decf0b095f6d2d89c25558",
    measurementId: "G-C7ZS6DEZ9J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore()
