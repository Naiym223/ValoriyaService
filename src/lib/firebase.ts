import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCjPifC8njhnEGiUrYKo5HiuiQd4dTny0k",
  authDomain: "valoriyaservice.firebaseapp.com",
  projectId: "valoriyaservice",
  storageBucket: "valoriyaservice.appspot.com",
  messagingSenderId: "973884239952",
  appId: "1:973884239952:web:valoriyaservice"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);