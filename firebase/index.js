import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDoiv2U4SzniE8gOk5JOvbjXbYAkMeimEs",
  authDomain: "react-weather-466e9.firebaseapp.com",
  projectId: "react-weather-466e9",
  storageBucket: "react-weather-466e9.appspot.com",
  messagingSenderId: "793366308210",
  appId: "1:793366308210:web:00408b29672a6f2597a9eb",
  measurementId: "G-92Z34NVZKZ"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
