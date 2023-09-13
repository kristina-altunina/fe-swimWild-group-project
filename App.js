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
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import config from "./firebaseConfig";

const app = initializeApp(config);
const auth = getAuth();

export default function App() {
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const connect = (token) => {
    console.log('connect');
    console.log(token);
    fetch("http://127.0.0.1:3000", {
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
}
  function handleSignUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setToken(user.stsTokenManager.accessToken);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function handleSignIn() {
    console.log('sign in');
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        setToken(user.stsTokenManager.accessToken);
        connect(user.stsTokenManager.accessToken);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  }
  function handleSignOut() {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
      <TouchableOpacity onPress={handleSignIn}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign Out</Text>
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
