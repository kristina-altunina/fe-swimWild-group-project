import { initializeApp, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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

async function tokenRefresh(token_refresh) {
 const url = "https://securetoken.googleapis.com/v1/token?key=" + FIREBASE_API_KEY
 const body = {grant_type: "refresh_token", refresh_token: token_refresh}
 const response = await
 fetch(url, {
      method: "POST",
      body: JSON.stringify(body)
        })
if (!response.ok) {
  throw new Error (response.status + " Error refreshing token")
}
const data = await response.json()

return data;
}

 function isCurrentUserAuthenticated(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      callback(true)
      // ...
    } else {
      // User is signed out
     callback(false)
    }
  });
}




export {auth, fbApp, fbStorage, tokenRefresh, isCurrentUserAuthenticated}