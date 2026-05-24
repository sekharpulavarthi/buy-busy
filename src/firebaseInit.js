// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4lYKNYTeaQED7Y9SPGc2D3CGV9MZdHHQ",
  authDomain: "buy-busy-c9b84.firebaseapp.com",
  projectId: "buy-busy-c9b84",
  storageBucket: "buy-busy-c9b84.firebasestorage.app",
  messagingSenderId: "702234277384",
  appId: "1:702234277384:web:18bc30c99ff3dc24b9c3bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
