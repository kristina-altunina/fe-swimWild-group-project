import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import NavBar from "./NavBar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { colours } from "../styles/base";

export default SignInUser = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  const connect = (token) => {
    setToken(token);
      fetch("https://spike-auth-server.onrender.com", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            navigation.navigate('Profile',
             {data: json})
          })
          .catch((err) => {
            console.log(err);
          });
    };

  function handleSignIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail("");
        setPassword("");
        connect(user.stsTokenManager.accessToken);
      })
      .catch((error) => {
        console.log(error);
      });
  }

return (
  <View style={styles.app}>
    <NavBar/>
   <View style={styles["container"]}>
    <Text style={styles["container__header"]}>Sign In</Text>
    <TextInput
      style={[styles["container__input"], focusedInput === "email" && {
        borderColor: colours.accent4,
        borderWidth: 2,
      }]}
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      onFocus={() => setFocusedInput("email")}
      onBlur={() => setFocusedInput(null)}
    ></TextInput>
    <TextInput
      style={[styles["container__input"], focusedInput === "password" && {
        borderColor: colours.accent4,
        borderWidth: 2,
      }]}
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      onFocus={() => setFocusedInput("password")}
      onBlur={() => setFocusedInput(null)}
      secureTextEntry
    ></TextInput>
    <StatusBar style="auto" />
    <TouchableOpacity style={styles["button"]} 
    onPress={handleSignIn}>
      <Text style={styles["button__text"]}>Sign In</Text>
    </TouchableOpacity>
   </View>
  </View>
); 
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: colours.bg,
    height: "100%",
    width: "100%",
  },
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
    borderWidth: 1,
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
  }
});
