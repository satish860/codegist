// Import the functions you need from the SDKs you need
import { initializeApp,getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmox8yVXib2ltPrYO50iaf9wOmvYIdr44",
  authDomain: "codegist-5c027.firebaseapp.com",
  projectId: "codegist-5c027",
  storageBucket: "codegist-5c027.appspot.com",
  messagingSenderId: "732095058834",
  appId: "1:732095058834:web:ae14f06f008e625b0da74b",
  measurementId: "G-B1N9FJ57MD"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig,"codegist") : getApp();

const db = getFirestore(app);


export { db ,firebaseConfig};