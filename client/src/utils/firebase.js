import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interview-agent-2980e.firebaseapp.com",
  projectId: "interview-agent-2980e",
  storageBucket: "interview-agent-2980e.firebasestorage.app",
  messagingSenderId: "1063130727835",
  appId: "1:1063130727835:web:c24e22f5a65f527c4a8d3e",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
