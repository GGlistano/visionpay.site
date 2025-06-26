import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJ7lrPXNJdOD_IG0G3JOc_Z8iWehOy48A",
  authDomain: "meu-sistema-cbae7.firebaseapp.com",
  projectId: "meu-sistema-cbae7",
  storageBucket: "meu-sistema-cbae7.firebasestorage.app",
  messagingSenderId: "471761058858",
  appId: "1:471761058858:web:d37ed5a580614a59c9d753"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);