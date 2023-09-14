import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

const config = {
  apiKey: "AIzaSyABjPb5ApAILuDCTMwHUPBh78nnCLhZmMg",
  authDomain: "swimwild-c2ca7.firebaseapp.com",
  projectId: "swimwild-c2ca7",
  storageBucket: "swimwild-c2ca7.appspot.com",
  messagingSenderId: "914299090405",
  appId: "1:914299090405:web:0520e1a7b19dc4b219ab0c",
  measurementId: "G-VBBKT6LJZ5",
};

const app = initializeApp(config);
export const auth = getAuth(app);
