// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvkXhy3iKGx8Jq_1IcChOmxKub29mrFTo",
  authDomain: "ai-trip-planner-41bd0.firebaseapp.com",
  projectId: "ai-trip-planner-41bd0",
  storageBucket: "ai-trip-planner-41bd0.firebasestorage.app",
  messagingSenderId: "970004425257",
  appId: "1:970004425257:web:ad13f1471c368eae64ca38",
  measurementId: "G-249QC8D8Z8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
