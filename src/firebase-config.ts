import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyABuHvqf-4Q2JCk0uaLdxxHzW9OW2GZAY4",
  authDomain: "chatapp-59ff1.firebaseapp.com",
  projectId: "chatapp-59ff1",
  storageBucket: "chatapp-59ff1.appspot.com",
  messagingSenderId: "29055585039",
  appId: "1:29055585039:web:1bdba3797227b2b5a24c7a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const  provider = new GoogleAuthProvider()
export const db = getFirestore(app)
