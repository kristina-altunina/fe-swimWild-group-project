import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import {FIREBASE_API_KEY, FIREBASE_STORAGE_BUCKET, FIREBASE_APP_ID, FIREBASE_PROJECT_ID, FIREBASE_AUTH_DOMAIN, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_MEASUREMENT_ID} from "@env"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import {getReactNativePersistence} from '@react-native-firebase/auth' ?

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
// const auth = getAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)});
const auth = getAuth(app);

const fbApp = getApp();
const fbStorage = getStorage();



/**
 * 
 * @param {*} uri 
 * @param {*} name 
 * @returns 
 */

const uploadToFirebase = (uri, name, onProgress) => {
  return fetch(uri)
  .then(fetchResponse => {
    return fetchResponse.blob()
  })
  .then(blob => {
    const imageRef = ref(getStorage(), `images/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, blob);


    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', 
      (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress && onProgress(progress);

      }, 
      (error) => {
        // Handle unsuccessful uploads
        reject(error)
      }, 
      () => {
        // Handle successful uploads on complete

        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          console.log('File available at', downloadURL);
          resolve({
            downloadURL,
            metadata: uploadTask.snapshot.metadata
          })
        });
      }
      );
    })
    
  })
}



export {auth, fbApp, fbStorage, uploadToFirebase}
// export { fbApp, fbStorage, uploadToFirebase}