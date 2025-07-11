// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Add this
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp7A0Gc40DYTdAjuJi4g8pE4K_dvVkedU",
  authDomain: "file-sharing-app-43b7c.firebaseapp.com",
  projectId: "file-sharing-app-43b7c",
  storageBucket: "file-sharing-app-43b7c.firebasestorage.app",
  messagingSenderId: "649684874153",
  appId: "1:649684874153:web:e5766b06e51f420432cab8",
  measurementId: "G-1MQSKG7EKQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// ✅ Add and export db
export const db = getFirestore(app);
