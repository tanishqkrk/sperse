
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    // Development keys
    // apiKey: "AIzaSyBXpNTXfSk0bL679ZV4BtrMB2tBax6-5TM",
    // authDomain: "sperse-79cb8.firebaseapp.com",
    // projectId: "sperse-79cb8",
    // storageBucket: "sperse-79cb8.appspot.com",
    // messagingSenderId: "40215369425",
    // appId: "1:40215369425:web:4d48e83deb9a4f497f57f0",
    // measurementId: "G-9FNC3BZ1GY"

    // Production keys
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
export const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((response) => {
            console.log(response);
        })
        .catch(error => console.log(error))
}