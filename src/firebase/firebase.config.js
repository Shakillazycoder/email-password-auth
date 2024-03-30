// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5n7Hxm3XcaurpZew0zSDHNw0Kc5mTHkA",
  authDomain: "email-password-auth-5d834.firebaseapp.com",
  projectId: "email-password-auth-5d834",
  storageBucket: "email-password-auth-5d834.appspot.com",
  messagingSenderId: "82494145784",
  appId: "1:82494145784:web:82cdbd463baad3de2de70d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth (app);

export default auth;