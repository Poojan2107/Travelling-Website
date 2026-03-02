// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2ogmg5iu2DEgqgYoCVvJ5DipuSzXh4yE",
  authDomain: "travelling-tent.firebaseapp.com",
  projectId: "travelling-tent",
  storageBucket: "travelling-tent.firebasestorage.app",
  messagingSenderId: "754627027189",
  appId: "1:754627027189:web:89fd249b28397e482225bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
