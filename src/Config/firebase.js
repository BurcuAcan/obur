// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBHAEa0mnd0xQC2_X82QziBeOM97FaWQhA",
    authDomain: "obur-89f2f.firebaseapp.com",
    projectId: "obur-89f2f",
    storageBucket: "obur-89f2f.appspot.com",
    messagingSenderId: "758524810794",
    appId: "1:758524810794:web:a58ec76ee852b1cdf11553"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export default firestore; 
