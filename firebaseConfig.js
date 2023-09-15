import { initializeApp, getApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import {FIREBASE_API_KEY, FIREBASE_STORAGE_BUCKET, FIREBASE_APP_ID, FIREBASE_PROJECT_ID, FIREBASE_AUTH_DOMAIN, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_MEASUREMENT_ID} from "@env"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

console.log(firebaseConfig)


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const fbApp = getApp();
const fbStorage = getStorage();

export {auth, fbApp, fbStorage}