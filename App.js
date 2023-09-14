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
import { uploadToFirebase } from './firebaseConfig';

// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

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
  const fonts = {
    Poppins_900Black,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_300Light_Italic,
    Poppins_200ExtraLight,
  };

  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [image, setImage] = useState(null);
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

  // -----------------image-picker test start of line
  function takePhoto() {
    ImagePicker.launchCameraAsync({allowsEditing:true, mediaTypes: ImagePicker.MediaTypeOptions.All, quality:1})
    .then((cameraResponse) => {
      if(!cameraResponse.canceled) {
        const {uri} = cameraResponse.assets[0];
        const fileName = uri.split('/').at(-1)
        uploadToFirebase(uri, fileName, (prog) => {
          console.log(prog)
        })
        .then((res) => {
          console.log(res)
        })
        .catch(err => {
          Alert.alert(`Error Uploading Image ${err.message}`)
        })
      }
    })
  }

  const pickImage = async () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    .then(res => {
      if (!res.cancelled) {
        setImage(res.assets[0].uri);
        const { uri } = res.assets[0]
        const fileName = uri.split('/').at(-1)
        uploadToFirebase(uri, fileName, (prog) => {
          console.log(prog)
        })
        .then((res) => {
          console.log(res)
        })
      }
      
    })


  
  };

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

{/* ------image picker start of line */}

<View style={styles.container}>
      <Text>test</Text>
      <StatusBar style="auto" />
      <Button title='Take Picture' onPress={takePhoto}></Button>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>

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
