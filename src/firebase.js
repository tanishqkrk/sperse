
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDvQGDHG-6sIV-5s2GaKpyyAte31WPwa1M",
    authDomain: "sperse-2549f.firebaseapp.com",
    projectId: "sperse-2549f",
    storageBucket: "sperse-2549f.appspot.com",
    messagingSenderId: "393989053794",
    appId: "1:393989053794:web:d01d756cf1540a165ea03b"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);