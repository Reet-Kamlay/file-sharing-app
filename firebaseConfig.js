// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
