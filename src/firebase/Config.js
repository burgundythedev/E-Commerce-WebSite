import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
export const firebaseConfig = {
  apiKey: "AIzaSyA6Ea7GjEirhxj5-XBGbxR0_NNEzIx8Rl0",
  authDomain: "eshop-2023-e2cb5.firebaseapp.com",
  projectId: "eshop-2023-e2cb5",
  storageBucket: "eshop-2023-e2cb5.appspot.com",
  messagingSenderId: "142039487746",
  appId: "1:142039487746:web:1cdcf09950e9e427515e1b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
