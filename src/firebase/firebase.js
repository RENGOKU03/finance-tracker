import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnlXzQmseHUpM6nGy4OVxyYNsZFfuwSx0",
  authDomain: "expense-tracker-7a2ee.firebaseapp.com",
  projectId: "expense-tracker-7a2ee",
  storageBucket: "expense-tracker-7a2ee.appspot.com",
  messagingSenderId: "847398458239",
  appId: "1:847398458239:web:dc0e219e0bc2d3561e004a",
  measurementId: "G-ZLZJ5PDR2E",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore(app);

export { auth, signInWithPopup, provider, db };
