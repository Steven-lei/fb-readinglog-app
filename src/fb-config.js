import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMIFkNn8MBBPJH5BpFjpToEVLqPB-k1W4",
  authDomain: "fbreactprj-65d18.firebaseapp.com",
  projectId: "fbreactprj-65d18",
  storageBucket: "fbreactprj-65d18.appspot.com",
  messagingSenderId: "381599542580",
  appId: "1:381599542580:web:e0d1cde10fb43f67e74961",
  storageBucket: "gs://fbreactprj-65d18.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
