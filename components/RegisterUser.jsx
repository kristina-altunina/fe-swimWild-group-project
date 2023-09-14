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

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { colours } from "../styles/base";

export default RegisterUser = () => {
  const [email, setEmail] = useState("");
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  function handleSignUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setToken(user.stsTokenManager.accessToken);
        setShowSignOut(false);
        setUserProperties(analytics, { name: name });
      })
      .catch((error) => {});
  }

  function handleInputFocus() {
    setIsInputFocused(true)
  }

  function handleInputBlur() {
    setIsInputFocused(false)
  }

  return (
    <View style={styles["container"]}>
      <Text style={styles["container__header"]}>Register</Text>
      <TextInput
        style={styles["container__input"]}
        placeholder="Forename"
        value={forename}
        onChangeText={setForename}
      ></TextInput>
      <TextInput
        style={styles["container__input"]}
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
      ></TextInput>
      <TextInput
        style={styles["container__input"]}
        placeholder="dd/mm/yyyy"
        value={dob}
        onChangeText={setDob}
      ></TextInput>
      <TextInput
        style={styles["container__input"]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      ></TextInput>
      <TextInput
        style={styles["container__input"]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      ></TextInput>
      <StatusBar style="auto" />
      <TouchableOpacity style={styles["button"]} onPress={handleSignUp}>
        <Text style={styles["button__text"]}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  "container": {
    flex: 1,
    width: "100%",
    backgroundColor: colours.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  "container__header": {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: colours.accent1,
  },
  "container__input": {
    width: "70%",
    borderColor: colours.accent4,
    borderWidth: 1.5,
    marginBottom: 15,
    padding: 5,
    color: colours.accent1,
  },
  "button": {
    width: "40%",
    alignItems: "center",
    backgroundColor: colours.accent2,
    padding: 15,
    borderRadius: 5,
    marginBottom: 5,
  },
  "button__text": {
    color: "#fff",
    fontWeight: "bold",
  },
});
