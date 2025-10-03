import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAblLb92a64g3kLuPfFtHGfHoco8spp038",
  authDomain: "crypto-auth-4bc96.firebaseapp.com",
  projectId: "crypto-auth-4bc96",
  storageBucket: "crypto-auth-4bc96.firebasestorage.app",
  messagingSenderId: "601493889227",
  appId: "1:601493889227:web:7a6118071cf8821fa1fb4e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
