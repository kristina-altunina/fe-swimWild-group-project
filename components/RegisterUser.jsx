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
import config from "../firebaseConfig";

const app = initializeApp(config);
const auth = getAuth();

export default RegisterUser = () => {

  const [email, setEmail] = useState("");
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setToken(user.stsTokenManager.accessToken);
        setShowSignOut(false)
        setUserProperties(analytics, { name: name });
      })
      .catch((error) => {
      });
  }

return (
    <View>
      <Text style={styles.header}>Register</Text>
      <TextInput 
        style={styles.input}
        placeholder="forename"
        value={forename}
        onChangeText={setForename}
      ></TextInput>
      <TextInput 
        style={styles.input}
        placeholder="surname"
        value={surname}
        onChangeText={setSurname}
      ></TextInput>
       <TextInput 
        style={styles.input}
        placeholder="dd/mm/yyyy"
        value={dob}
        onChangeText={setDob}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      ></TextInput>
      <StatusBar style="auto" />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
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
    header: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 15,
    },
    input: {
      width: "50%",
      borderColor: "#ccc",
      borderWidth: 1,
      marginBottom: 5,
      padding: 5,
    },
    button: {
      width: "50%",
      alignItems: "center",
      backgroundColor: "#ababab",
      padding: 5,
      borderRadius: 3,
      marginBottom: 5,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    }
  });