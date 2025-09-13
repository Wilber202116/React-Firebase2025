import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBMuqqtDDQx1xbC8bxK4vi4Ppzc_i3YtJY",
    authDomain: "fir-react2025.firebaseapp.com",
    projectId: "fir-react2025",
    storageBucket: "fir-react2025.firebasestorage.app",
    messagingSenderId: "754166553381",
    appId: "1:754166553381:web:d8e4fb54f555f9334a18cc"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const auth = getAuth(app)