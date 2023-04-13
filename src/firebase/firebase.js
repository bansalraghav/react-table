import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
    getFirestore
} from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9TnuIMG7lQ3atknHlTsJvosXFbuh8uzw",
    authDomain: "table-e3141.firebaseapp.com",
    projectId: "table-e3141",
    storageBucket: "table-e3141.appspot.com",
    messagingSenderId: "524605886674",
    appId: "1:524605886674:web:79536fbcdd85a5dfa99d0b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };