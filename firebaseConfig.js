import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

const config = {
  apiKey: "AIzaSyCuOS-sD421ooU-M41VcsKKSSQbz_Xxw1Q",
authDomain: "swimwild-f10cb.firebaseapp.com",
projectId: "swimwild-f10cb",
storageBucket: "swimwild-f10cb.appspot.com",
messagingSenderId: "22401308409",
appId: "1:22401308409:web:506a5a49fd9811075a7428",
measurementId: "G-5YJ95BFBDC"
};

const app = initializeApp(config);
export const auth = getAuth(app);
