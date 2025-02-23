// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSiR4bria_tRTNiQ7b73SfSrfxMywn8GQ",
  authDomain: "ridegreen-2.firebaseapp.com",
  projectId: "ridegreen-2",
  storageBucket: "ridegreen-2.firebasestorage.app",
  messagingSenderId: "163238753138",
  appId: "1:163238753138:web:e86df78ce2ce58e770a3eb",
  measurementId: "G-ZLBWYKY07H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
