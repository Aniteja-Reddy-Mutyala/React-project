import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd2vgEaZKDTMC0K1Hnw5rCdnJPMmlXymk",
  authDomain: "full-stack-react-e1ff2.firebaseapp.com",
  projectId: "full-stack-react-e1ff2",
  storageBucket: "full-stack-react-e1ff2.firebasestorage.app",
  messagingSenderId: "128232556085",
  appId: "1:128232556085:web:4db1a2dae19102ab25137c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


createRoot(document.getElementById('root')).render(
 
    <App />

)
