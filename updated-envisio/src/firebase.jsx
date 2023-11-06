// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXIOyAUuw9FI9wttKmPtClVcQ9Un9urPE",
  authDomain: "envisio-auth.firebaseapp.com",
  projectId: "envisio-auth",
  storageBucket: "envisio-auth.appspot.com",
  messagingSenderId: "156472264136",
  appId: "1:156472264136:web:8df1583e43860e89d32cfd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
