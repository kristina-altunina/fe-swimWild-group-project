import { useEffect, useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";

import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

import { colours } from "./styles/base";
import RegisterUser from "./components/RegisterUser";
import SignInUser from "./components/SignInUser";
import {
  useFonts,
  Poppins_900Black,
  Poppins_600SemiBold,
  Poppins_500Medium,
  Poppins_300Light_Italic,
  Poppins_200ExtraLight,
} from "@expo-google-fonts/poppins";

import { Button, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

import { takePhoto, pickImage } from "./scripts/image-picker";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import TestPage from "./components/TestPage";

export default function App() {
  const [token, setToken] = useState("");
  const [showSignOut, setShowSignOut] = useState(false);
  const [option, setOption] = useState("");
  const [data, setData] = useState("");
  const fonts = {
    Poppins_900Black,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_300Light_Italic,
    Poppins_200ExtraLight,
  };

  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [showTest, setShowTest] = useState(false) 
  // const [fontsLoaded, fontError] = useFonts({
  //   "Poppins-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded || fontError) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, fontError]);

  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }

  let [fontsLoaded] = useFonts({
    Poppins_900Black,
    Poppins_600SemiBold,
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

  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }

    // -----------------image-picker test start of line
    if(permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
      return (
        <View style={styles.container}>
          <Text>Permission not granted {permission?.status}</Text>
          <StatusBar style="auto" />
          <Button title='Request Permission' onPress={requestPermission}></Button>
        </View>
      );
    }
     // -----------------image-picker test end of line

     function handleTest() {
      console.log('here')
      return (
        <Test/>
      )
     }

  return (
    <View style={styles.app}>
      <View style={styles.header}>
        <Text style={styles.header__title}>Swim Wild</Text>
        <View style={styles.header__nav}></View>
      </View>
      <View style={styles.container}>
        {option === "signin" && !data ? (
          <SignInUser fonts={fonts} connect={connect} />
        ) : null}
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
        {option === "signup" && !data ? <RegisterUser font={fonts} /> : null}
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

        <Button title='Go to Test Page' onPress={() => setShowTest(!showTest)}></Button>
            {showTest ? (<TestPage/>): ''}
{/* ------image picker start of line */}

{/* <View style={styles.container}>
      <Text>test</Text>
      <StatusBar style="auto" />
      <Button title='Take Picture' onPress={takePhoto}></Button>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
    </View> */}
    {/* --------------image picker end of line */}
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
  },
  header__title: {
    fontSize: 32,
    fontFamily: "Poppins_900Black",
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
