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
  Button
} from "react-native";

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { colours } from "../styles/base";

export default RegisterUser = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [isSighUpClicked, setIsSignUpClicked] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  function handleSignUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setToken(user.stsTokenManager.accessToken);
        setShowSignOut(false);
        setUserProperties(analytics, { name: name });
        setIsSignUpClicked(true)
      })
      .catch((error) => {});
  }

  return (
<SafeAreaView style={{ flex: 1 }}>
  <View style={{
          padding: 20,
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
    <NavBar/>
    <View style={styles["container"]}>
      
      <Text style={styles["container__header"]}>Register</Text>
      <TextInput
        style={[styles["container__input"], focusedInput === "forename" && {
          borderColor: colours.accent4,
          borderWidth: 2,
        }]}
        placeholder="Forename"
        value={forename}
        onChangeText={setForename}
        onFocus={() => setFocusedInput("forename")}
        onBlur={() => setFocusedInput(null)}
      ></TextInput>
      <TextInput
        style={[styles["container__input"], focusedInput === "surname" && {
          borderColor: colours.accent4,
          borderWidth: 2,
        }]}
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
        onFocus={() => setFocusedInput("surname")}
        onBlur={() => setFocusedInput(null)}
      ></TextInput>
      <TextInput
        style={[styles["container__input"], focusedInput === "dob" && {
          borderColor: colours.accent4,
          borderWidth: 2,
        }]}
        placeholder="dd/mm/yyyy"
        value={dob}
        onChangeText={setDob}
        onFocus={() => setFocusedInput("dob")}
        onBlur={() => setFocusedInput(null)}
        onPressIn={showDatePicker}
      ></TextInput>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
        </Text>
        <DateTimePickerModal
          date={selectedDate}
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
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
      <TouchableOpacity style={[styles["button"], 
      isSighUpClicked ? {backgroundColor :colours.accent3} : null]} 
      onPress={handleSignUp}>
        <Text style={styles["button__text"]}>Sign Up</Text>
      </TouchableOpacity>
    </View>
   </View>
  </SafeAreaView>
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
  },
});
