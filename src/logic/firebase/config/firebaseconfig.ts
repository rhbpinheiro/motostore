// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDvfU02EWWqh3DwmyR08gSJMqIrXTZ9jfE',
    authDomain: 'motostore-90d42.firebaseapp.com',
    projectId: 'motostore-90d42',
    storageBucket: 'motostore-90d42.appspot.com',
    messagingSenderId: '685207030561',
    appId: '1:685207030561:web:9b061240073112d9d78c60',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
