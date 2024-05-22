// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqKDNevbdYPAnxrfr9EtjHYEeV6OY5GdQ",
  authDomain: "fir-test-3db23.firebaseapp.com",
  projectId: "fir-test-3db23",
  storageBucket: "fir-test-3db23.appspot.com",
  messagingSenderId: "957153978866",
  appId: "1:957153978866:web:e2d98ab64c48172630236b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);