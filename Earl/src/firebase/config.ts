// Firebase configuration
// Replace with your Firebase project configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoS97WiWFEZvY8ZDdsGtckKPIT3irf4gU",
  authDomain: "earl-c6df5.firebaseapp.com",
  projectId: "earl-c6df5",
  storageBucket: "earl-c6df5.firebasestorage.app",
  messagingSenderId: "38345417571",
  appId: "1:38345417571:web:6da045f73b4f877e8e2956",
  measurementId: "G-NXV40JWJXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Uncomment and configure when setting up Firebase
/*
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
*/