import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import RegisterUser from "./components/RegisterUser";
import SignInUser from "./components/SignInUser";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import config from "./firebaseConfig";

const app = initializeApp(config);
const auth = getAuth();

export default function App() {
  const [token, setToken] = useState("");
  const [showSignOut, setShowSignOut] = useState(false);
  const [option, setOption] = useState("")
  const [data, setData] = useState("");

  const connect = (token) => {
    setShowSignOut(true);
    setToken(token);
    setOption("")
    console.log('connect');
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
}
  
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("sign out")
        setShowSignOut(false)
        setData("")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  
  return (
    <View style={styles.container}>
      {option === "signin" && !data ? <SignInUser connect={connect}/>: null }
      {option === "" && !data ?<TouchableOpacity style={styles.button} onPress={()=>{ setOption("signin")}} >
        <Text>Sign In</Text>
      </TouchableOpacity>: null}
      {option === "signup" && !data ? <RegisterUser/>: null }
      { option === "" && !data ? <TouchableOpacity style={styles.button} onPress={()=>{ setOption("signup")}} >
        <Text>Sign Up</Text>
      </TouchableOpacity> : null}
      <Text>{data.greeting}</Text>
      { showSignOut ? <TouchableOpacity style={styles.button} onPress={handleSignOut} >
        <Text>Sign Out</Text>
      </TouchableOpacity> : null }
      {option !== "" && !data ?<TouchableOpacity style={styles.button} onPress={()=>{setOption("")}} >
        <Text>Back</Text>
      </TouchableOpacity>: null}
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
  },
  
  
});
