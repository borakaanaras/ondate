import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAjMD5lboMaFRKL2zB76_-oJAm8lsPKlFQ",
    authDomain: "ondate-c82c4.firebaseapp.com",
    projectId: "ondate-c82c4",
    storageBucket: "ondate-c82c4.firebasestorage.app",
    messagingSenderId: "585038913025",
    appId: "1:585038913025:ios:f8bc56f920c617df4eea00"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Servisleri yapılandır
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Kullanıcı koleksiyonu referansı
export const usersCollection = collection(db, 'users');
export const postsCollection = collection(db, 'posts');

export default app;
  