// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",                    // Replace with your API key
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // Replace with your project auth domain
  projectId: "YOUR_PROJECT_ID",                   // Replace with your project ID
  storageBucket: "YOUR_PROJECT_ID.appspot.com",   // Replace with your storage bucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // Replace with your messaging sender ID
  appId: "YOUR_APP_ID",                           // Replace with your app ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
