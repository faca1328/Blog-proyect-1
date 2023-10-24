// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfmtEy7jG2IMaLppHROtgh4GuWDjUolx4",
  authDomain: "blog-proyect-14415.firebaseapp.com",
  projectId: "blog-proyect-14415",
  storageBucket: "blog-proyect-14415.appspot.com",
  messagingSenderId: "269980266098",
  appId: "1:269980266098:web:894cd9cb57af672a41dceb"
};

// Initialize Firebase
//export const app = initializeApp(firebaseConfig);

export const app = firebase.initializeApp(firebaseConfig);

//permite autenticar
export const auth = getAuth(app)

//export const db = getFirestore(app);

export const db = firebase.firestore(app)


