import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

console.log('🔧 Configurando Firebase...');
console.log('🏢 Project ID desde .env:', process.env.FIREBASE_PROJECT_ID);
console.log('🔑 API Key existe:', !!process.env.FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

console.log('📋 Firebase Config:', firebaseConfig);

const app = initializeApp(firebaseConfig)

const db = getFirestore(app);

export { db };