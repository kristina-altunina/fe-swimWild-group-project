import { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABjPb5ApAILuDCTMwHUPBh78nnCLhZmMg",
  authDomain: "swimwild-c2ca7.firebaseapp.com",
  projectId: "swimwild-c2ca7",
  storageBucket: "swimwild-c2ca7.appspot.com",
  messagingSenderId: "914299090405",
  appId: "1:914299090405:web:0520e1a7b19dc4b219ab0c",
  measurementId: "G-VBBKT6LJZ5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    fetch("https://spike-auth-server.onrender.com", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  function handleSignUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setToken(user.stsTokenManager.accessToken);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  }

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      ></TextInput>
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
      ></TextInput>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={handleSignUp}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <Text>{data.greeting}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
