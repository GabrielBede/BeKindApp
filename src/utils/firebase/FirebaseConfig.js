import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRfH5CDa07TULvyxdta_haFRUf4O_PUGE",
  authDomain: "bekind-e12fd.firebaseapp.com",
  projectId: "bekind-e12fd",
  storageBucket: "bekind-e12fd.appspot.com",
  messagingSenderId: "676389199531",
  appId: "1:676389199531:web:cda606b57d168ea1ec21ee",
  measurementId: "G-G9T8VQ5BVL"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP); 
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP); 
