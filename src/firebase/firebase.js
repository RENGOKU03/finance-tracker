// firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // <--- Add GoogleAuthProvider here
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
// IMPORTANT: Replace these with your actual project's configuration from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAnlXzQmseHUpM6nGy4OVxyYNsZFfuwSx0",
  authDomain: "expense-tracker-7a2ee.firebaseapp.com",
  projectId: "expense-tracker-7a2ee",
  storageBucket: "expense-tracker-7a2ee.appspot.com",
  messagingSenderId: "847398458239",
  appId: "1:847398458239:web:dc0e219e0bc2d3561e004a",
  measurementId: "G-ZLZJ5PDR2E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Google Auth Provider <--- Add this line
export const provider = new GoogleAuthProvider();