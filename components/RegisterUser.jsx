import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import NavBar from "./NavBar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from "react-native";

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { colours } from "../styles/base";

import { pickImage } from "../scripts/image-picker";
import * as ImagePicker from 'expo-image-picker';

import { pad, formatDate } from "../extentions";

export default RegisterUser = ({navigation}) => {
  const dateNow = new Date()
  const minimumDate = new Date(dateNow.getFullYear()-18, dateNow.getMonth(), dateNow.getDay())
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [dob, setDob] = useState("");
  const [requestedDate, setRequestedDate] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null);
  const [isSighUpClicked, setIsSignUpClicked] = useState(false);
  const [passwordError, setPasswordError] = useState("")
  const [selectedDate, setSelectedDate] = useState(minimumDate);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const [mediaPermission, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions();
  
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    setRequestedDate(date.toISOString());
    setDob(formatDate(date.toISOString().split('T')[0], '-'));
    console.log(date.toISOString());
    hideDatePicker();
  };

  async function handleSignUp() {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    const user = response.user
    console.log(user);
    await swimWildSignUp(user.stsTokenManager.accessToken, user.stsTokenManager.refreshToken, user.uid)
    .then((response) => {
      console.log(response);
    })
    }

async function swimWildSignUp(token, refresh_token, uid) {
  console.log("inside swimWildSignUp, uid", uid);
      const data = {
        uid: uid,
        name: fullname,
        nickname: nickname,
        dob: requestedDate,
        profileImg: null,
      }
      console.log(data);
    try {
      const response = await fetch("https://spike-auth-server.onrender.com/users", {
           method: "POST",
    
           mode: "cors",
           headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
              },
           body: JSON.stringify(data)
             })
             if (!response.ok) {
              console.log(response, "<---- THIS");
              throw new Error (response.status + " Error refreshing token")
            
            }
            console.log(response);
           const dataJSON = await response.json()
        console.log(dataJSON);
        navigation.navigate('Profile',
          {data: json, refresh_token: refresh_token})
}
catch (err){
  console.log(err);
}
} 

  function handleImageUpload() {
    const imagePickerSettings = {
      title: 'Select Profile Photo',
      storage: {
        skipBackup: true,
        path: 'images'
      } 
    }

    if(mediaPermission?.status !== ImagePicker.PermissionStatus.GRANTED) {
      return requestMediaPermission()
    }
    pickImage()
  }

  useEffect(() => {
    validateForm()
  }, [fullname, nickname, dob, email, password])

  function validateForm() {
    setPasswordError("")
    if (password === "" || password.length <= 5) {
      setPasswordError("Password must contain minimum of 6 characters")
    }

    if (fullname !== "" && nickname !== "" && dob !== "" && email !== "" && password !== "") {
      setValidated(true);
    } else {
      setValidated(false)
    }
  }

  return (
<SafeAreaView style={{ flex: 1 }}>
  <KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -300} 
  style={{flex: 1}}> 
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
  <View style={{flex: 1}}>
    <NavBar/>
    <ScrollView contentContainerStyle={styles.scroll}
    keyboardShouldPersistTaps="handled">
    <View style={styles.container}>
      <Text style={[styles.header, { zIndex: 1}]}>Register</Text>
      <TextInput
        style={[
          styles.input,
          focusedInput === "fullname" && styles.input_focused,
        ]}
        placeholder="Full Name"
        value={fullname}
        onChangeText={(value) => {setFullName(value)}}
        onFocus={() => setFocusedInput("fullname")}
        onBlur={() => setFocusedInput(null)}
      ></TextInput>
      <TextInput
        style={[
          styles.input,
          focusedInput === "nickname" && styles.input_focused,
        ]}
        placeholder="Nickname"
        value={nickname}
        onChangeText={(value) => {setNickname(value)}}
        onFocus={() => setFocusedInput("nickname")}
        onBlur={() => setFocusedInput(null)}
      ></TextInput>
      <TextInput
        style={[
          styles.input, 
          focusedInput === "dob" && styles.input_focused,
        ]}
        placeholder="Select date of birth"
        value={dob}
        onChangeText={(value) => {setDob(value)}}
        onFocus={() => setFocusedInput("dob")}
        onBlur={() => setFocusedInput(null)}
        onPressIn={showDatePicker}
      ></TextInput>
        <DateTimePickerModal
          maximumDate={new Date("2005-09-15")}
          date={selectedDate}
          isVisible={datePickerVisible}
          mode="date"
          locale="en_GB"
          timeZoneOffsetInMinutes={0}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      <TextInput
        style={[
          styles.input, 
          focusedInput === "email" && styles.input_focused,
        ]}
        placeholder="Email"
        value={email}
        onChangeText={(value) => {setEmail(value)}}
        onFocus={() => setFocusedInput("email")}
        onBlur={() => setFocusedInput(null)}
      ></TextInput>
      <TextInput
        style={[
          styles.input, 
          focusedInput === "password" && styles.input_focused,
        ]}
        placeholder="Password"
        value={password}
        onChangeText={(value) => {setPassword(value)}}
        onFocus={() => setFocusedInput("password")}
        onBlur={() => setFocusedInput(null)}
        secureTextEntry
      ></TextInput>
      <Text>{passwordError}</Text>

    <View style={styles.button__container}> 
      <TouchableOpacity style={styles.upload__button} onPress={handleImageUpload}>
        <Text style={styles.button__text}>Select Photo</Text>
    </TouchableOpacity>
      <StatusBar style="auto" />
    <TouchableOpacity style={styles.camera__button} onPress={handleImageUpload}>
        <Text style={styles.button__text}>Take a Photo</Text>
    </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
    <TouchableOpacity disabled={!validated} style={[styles.button, 
      isSighUpClicked ? styles.button__accent : null]} 
      onPress={handleSignUp}>
        <Text style={styles.button__text}>Sign Up</Text>
    </TouchableOpacity>      
    </View>
   </ScrollView>
   </View>
   </TouchableWithoutFeedback>
   </KeyboardAvoidingView>
  </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  app: {
    backgroundColor: colours.bg,
    height: "100%",
    width: "100%",
  },
  scroll: {
      padding: 20,
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colours.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: colours.accent1,
  },
  input: {
    width: "100%",
    borderColor: colours.accent4,
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    color: colours.accent1,
  },
  input_focused: {
  borderColor: colours.accent4,
  borderWidth: 2,
  },
  button__container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10
  },
  button: {
    width: "40%",
    alignItems: "center",
    backgroundColor: colours.accent2,
    padding: 15,
    borderRadius: 5,
    marginBottom: 5,
  },
  button__accent: {
    backgroundColor: colours.accent3,
  },
  button__text: {
    alignItems: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  upload__button: {
    flex:1,
    marginRight: 15,
    width: "40%",
    alignItems: "center",
    backgroundColor: colours.accent4,
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  camera__button: {
    flex: 1,
    width: "40%",
    alignItems: "center",
    backgroundColor: colours.accent4,
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  }
});
