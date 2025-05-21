/*---+---+---+--Start of Firebase.jsx Block---+---+---+--*/

/**
 * Firebase.jsx - The Backend Powerhouse ⚡
 * This file connects our syllabus app to Firebase services:
 * - User login/registration (Authentication)
 * - Syllabus data storage (Firestore)
 * - PDF file handling (Storage)
 */

/*---+---+---+--Start of Firebase Imports Block---+---+---+--*/
// Tools we need from Firebase
import { initializeApp } from "firebase/app";

// Login/Signup functionality
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  onAuthStateChanged, 
  GoogleAuthProvider,
  signInWithRedirect, 
  getRedirectResult 
} from "firebase/auth";

// Database tools
import { getFirestore, doc, setDoc } from "firebase/firestore";

// File storage tools
import { getStorage } from "firebase/storage";
/*---+---+---+--End of Firebase Imports Block---+---+---+--*/


/*---+---+---+--Start of Firebase Setup Block---+---+---+--*/
// Our app's unique Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "syllabye-d56d5.firebaseapp.com",
  projectId: "syllabye-d56d5",
  storageBucket: "syllabye-d56d5.firebasestorage.app",
  messagingSenderId: "901401987232",
  appId: "1:901401987232:web:660bf08368ab4b35a2e1c5"
};

// Start up our Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);         // Handles user accounts
const db = getFirestore(app);      // Stores syllabus data
export const storage = getStorage(app); // Handles PDF files

// Set up Google login option
const provider = new GoogleAuthProvider();
/*---+---+---+--End of Firebase Setup Block---+---+---+--*/


/*---+---+---+--Start of Exports Block---+---+---+--*/
// Make these services available to our whole app
export { 
  auth,                   // User account system
  db,                     // Syllabus database
  signInWithEmailAndPassword,    // Email login
  createUserWithEmailAndPassword, // User registration
  sendPasswordResetEmail,        // Password recovery
  onAuthStateChanged,      // Track logged-in users
  doc,                    // Work with database documents
  setDoc,                 // Save data to database
  provider,               // Google login
  signInWithRedirect,     // Alternative login method
  getRedirectResult       // Handle login results
};
/*---+---+---+--End of Exports Block---+---+---+--*/

/*---+---+---+--End of Firebase.jsx Block---+---+---+--*/