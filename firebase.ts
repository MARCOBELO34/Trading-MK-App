import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyC8dSyObG_pffTKx8W2Ig3RihOOfGdt314",
  authDomain: "trading-mk.firebaseapp.com",
  projectId: "trading-mk",
  storageBucket: "trading-mk.firebasestorage.app",
  messagingSenderId: "1058752931983",
  appId: "1:1058752931983:web:7d9f0093570020017b68fa",
  measurementId: "G-9PXK6KB62Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
