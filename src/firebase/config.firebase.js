import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCJZqCftOk2NY2GOEwGzgaGM4FPvcsLrmk",
  authDomain: "kiosk-daeeb.firebaseapp.com",
  databaseURL: "https://kiosk-daeeb-default-rtdb.firebaseio.com",
  projectId: "kiosk-daeeb",
  storageBucket: "kiosk-daeeb.appspot.com",
  messagingSenderId: "1029120983246",
  appId: "1:1029120983246:web:758b9e15fd6721a1bdd09f",
  measurementId: "G-71W1D65SN7"
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)