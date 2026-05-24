import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD4lYKNYTeaQED7Y9SPGc2D3CGV9MZdHHQ",
  authDomain: "buy-busy-c9b84.firebaseapp.com",
  projectId: "buy-busy-c9b84",
  storageBucket: "buy-busy-c9b84.firebasestorage.app",
  messagingSenderId: "702234277384",
  appId: "1:702234277384:web:18bc30c99ff3dc24b9c3bd",
};

const app = initializeApp(firebaseConfig);

export { app };
