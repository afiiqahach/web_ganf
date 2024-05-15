import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_KEY,
  apiKey: "AIzaSyATFGrHCYoHka1NbkewlyzwA7xGEw_L8Hg",
  authDomain: "ganf-e2b37.firebaseapp.com",
  projectId: "ganf-e2b37",
  storageBucket: "ganf-e2b37.appspot.com",
  messagingSenderId: "888859683051",
  appId: "1:888859683051:web:2cecb93af9c916fd01b6ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const database = getDatabase(app)