import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIgGt95LQmDaDvbSd-2mjIb7n1u0VYJ1I",
  authDomain: "grocery-billing-app-6e4a6.firebaseapp.com",
  projectId: "grocery-billing-app-6e4a6",
  storageBucket: "grocery-billing-app-6e4a6.firebasestorage.app",
  messagingSenderId: "713534594",
  appId: "1:713534594:web:124aca3649e9a50eb3589b",
  measurementId: "G-KBQGDHQVY6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);