// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrJvJyPIZW-0LiAe7jGU9GCCtJ4T9RDFI",
  authDomain: "syllabye-d56d5.firebaseapp.com",
  projectId: "syllabye-d56d5",
  storageBucket: "syllabye-d56d5.firebasestorage.app",
  messagingSenderId: "901401987232",
  appId: "1:901401987232:web:660bf08368ab4b35a2e1c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export const storage = getStorage(app);

export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, doc, setDoc };