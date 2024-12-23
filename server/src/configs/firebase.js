// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJAwt4X2-mnll_CuLv-6Yywng1hnSJQhI",
  authDomain: "culinairy-f6a1e.firebaseapp.com",
  projectId: "culinairy-f6a1e",
  storageBucket: "culinairy-f6a1e.firebasestorage.app",
  messagingSenderId: "1025599882388",
  appId: "1:1025599882388:web:09f9210a3045f49b032081",
  measurementId: "G-YC46N9SJT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);