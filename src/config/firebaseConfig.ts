import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

  const firebaseConfig = {
    apiKey: "AIzaSyBfu13js7QxWQT877fKWPWIs90XBsPXTck",
    authDomain: "todoevent-5cc7a.firebaseapp.com",
    projectId: "todoevent-5cc7a",
    storageBucket: "todoevent-5cc7a.appspot.com", 
    messagingSenderId: "338985090242",
    appId: "1:338985090242:web:aa88a8c6775fb42f8f8f5b",
    measurementId: "G-4RGBYLXCJG"
  };
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);