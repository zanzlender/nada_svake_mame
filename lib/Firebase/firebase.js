import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyA5fc-usadsppYr-huwZGQmHweaRQJMKbQ",
  authDomain: "nada-svake-mame.firebaseapp.com",
  projectId: "nada-svake-mame",
  storageBucket: "nada-svake-mame.appspot.com",
  messagingSenderId: "624766617339",
  appId: "1:624766617339:web:336dc22e53e1f645afd25e",
  measurementId: "${config.measurementId}",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}

export function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
