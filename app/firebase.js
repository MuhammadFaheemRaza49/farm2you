// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyArMWLICKrCOMb8bnPV4TXILh4nxCdiSXs",
  authDomain: "farm2you-8a18f.firebaseapp.com",
  projectId: "farm2you-8a18f",
  storageBucket: "farm2you-8a18f.appspot.com", // ✅ fixed here
  messagingSenderId: "804234051737",
  appId: "1:804234051737:web:a8ad6011c9ee8df38e7808",
  measurementId: "G-E2FCJ9PZHX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
