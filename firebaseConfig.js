import { initializeApp, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";
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
  console.log('called refresh token', token_refresh)
  if(!token_refresh) return {};

 const url = "https://securetoken.googleapis.com/v1/token?key=" + FIREBASE_API_KEY
 const body = {grant_type: "refresh_token", refresh_token: token_refresh}
 const response = await
 fetch(url, {
      method: "POST",
      body: JSON.stringify(body)
        })
if (!response.ok) {
  console.log("Error refreshing token", response)
  return {}
}
const data = await response.json()

return data;
}

  function deleteCurrentUser(callback){
    const user = auth.currentUser
    user.delete()
      .then(() => {
        console.log('delete from FB');
        callback()
      })
      .catch((error) => console.log('ERROR DELETING FROM FIREBASE', error));
 }
 function isCurrentUserAuthenticated(callback) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(true)
    } else {
     callback(false)
    }
  });
}




export {auth, fbApp, fbStorage, tokenRefresh, isCurrentUserAuthenticated, deleteCurrentUser}