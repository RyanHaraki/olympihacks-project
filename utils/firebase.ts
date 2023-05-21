// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXphlyzXqd4RnWWP4oaXBF-pEH8YYoiy0",
  authDomain: "solform-d08e2.firebaseapp.com",
  projectId: "solform-d08e2",
  storageBucket: "solform-d08e2.appspot.com",
  messagingSenderId: "362105529277",
  appId: "1:362105529277:web:225d3db658ea2294c0a8d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;