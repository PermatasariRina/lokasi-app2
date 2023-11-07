// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6XUF-KII1SdFM4N4Ee9uu9G-0-XAwUtU",
    authDomain: "fir-auth-d9b01.firebaseapp.com",
    projectId: "fir-auth-d9b01",
    storageBucket: "fir-auth-d9b01.appspot.com",
    messagingSenderId: "191086539821",
    appId: "1:191086539821:web:117d42e64b767bdfc534a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};