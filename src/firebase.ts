import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACqzZFelJiIFhHUSDxw3nxFTp628IcEXk",
  authDomain: "menu-semanal-8f085.firebaseapp.com",
  projectId: "menu-semanal-8f085",
  storageBucket: "menu-semanal-8f085.firebasestorage.app",
  messagingSenderId: "847101282660",
  appId: "1:847101282660:web:64a5217064a4fd0491d271"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
