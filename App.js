import { useEffect, useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";

import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

import { colours } from "./styles/base";
import RegisterUser from "./components/RegisterUser";
import SignInUser from "./components/SignInUser";

import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_900Black,
  Poppins_500Medium,
  Poppins_300Light_Italic,
  Poppins_200ExtraLight,
} from "@expo-google-fonts/poppins";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function App() {
  const [token, setToken] = useState("");
  const [showSignOut, setShowSignOut] = useState(false);
  const [option, setOption] = useState("");
  const [data, setData] = useState("");

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_900Black,
    Poppins_500Medium,
    Poppins_300Light_Italic,
    Poppins_200ExtraLight,
  });

  if (!fontsLoaded) {
    return null;
  }

  const connect = (token) => {
    setShowSignOut(true);
    setToken(token);
    setOption("");
    console.log("connect");
    console.log(token);
    fetch("https://swim-wild-kristina.onrender.com", {
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
  };

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("sign out");
        setShowSignOut(false);
        setData("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <View style={styles.app}>
      <View style={styles.header}>
        <View style={styles.header__titleContainer}>
          <Text style={styles.header__title}>
            Swim <Text style={styles.header__titleAccent}>Wild</Text>
          </Text>
        </View>
        <View style={styles.header__buttons}>
          <TouchableOpacity style={styles.header__button}>
            <Text style={styles.header__buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.header__button}>
            <Text style={styles.header__buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        {option === "signin" && !data ? <SignInUser connect={connect} /> : null}
        {option === "" && !data ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setOption("signin");
            }}
          >
            <Text>Sign In</Text>
          </TouchableOpacity>
        ) : null}
        {option === "signup" && !data ? <RegisterUser /> : null}
        {option === "" && !data ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setOption("signup");
            }}
          >
            <Text>Sign Up</Text>
          </TouchableOpacity>
        ) : null}
        <Text>{data.greeting}</Text>
        {showSignOut ? (
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text>Sign Out</Text>
          </TouchableOpacity>
        ) : null}
        {option !== "" && !data ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setOption("");
            }}
          >
            <Text>Back</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: colours.bg,
    height: "100%",
    width: "100%",
  },
  header: {
    backgroundColor: colours.accent1,
    height: "fit-content",
    color: colours.text,
    marginTop: 50,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header__titleContainer: {
    margin: 10,
  },
  header__title: {
    fontSize: 32,
    fontFamily: "Poppins_900Black",
    color: colours.text,
  },
  header__titleAccent: {
    color: colours.accent4,
  },
  header__buttons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
  },
  header__button: {
    marginRight: 20,
  },
  header__buttonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: colours.bg,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  },
});

("");
