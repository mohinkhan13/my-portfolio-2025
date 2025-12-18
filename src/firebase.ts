// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Database ke liye
import { getStorage } from "firebase/storage";     // Images ke liye

// Aapka Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfDJszNvRxBPdjQ94pXcJaispMRyaF3ys",
  authDomain: "mohinportfolio.firebaseapp.com",
  projectId: "mohinportfolio",
  storageBucket: "mohinportfolio.firebasestorage.app",
  messagingSenderId: "708753695702",
  appId: "1:708753695702:web:234c72cff062635a40ba77",
  measurementId: "G-W9NRYY7Q9E"
};

// App Initialize
const app = initializeApp(firebaseConfig);

// Export Database & Storage
export const db = getFirestore(app);
export const storage = getStorage(app);