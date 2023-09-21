import { useState } from "react";
import NavBar from "./NavBar";
import {
    ScrollView,
	StyleSheet,
	Text,
	View, SafeAreaView,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { colours } from "../styles/base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getFirebaseError } from "../extentions";
import CustomInput from "./CustomInput";
import { Formik, Field } from "formik";
import * as yup from 'yup';
import ResetPassword from "./ResetPassword";


export default SignInUser = ({ navigation }) => {
  
  const [focusedInput, setFocusedInput] = useState(null);
  const [isSignInClicked, setIsSignInClicked] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSignIn(values) {
    setFirebaseError('')
    setSending(true)
    setIsSignInClicked(true)
    try {
        const response = await signInWithEmailAndPassword(auth, values.email, values.password)
        const user = response.user;
        console.log(user);
        navigation.navigate('Profile',
        {refresh_token: user.stsTokenManager.refreshToken})
    }
    catch(error) {
        console.log(error, "three");
        setSending(false)
        setIsSignInClicked(false)
        const firebaseError = getFirebaseError(error);
        setFirebaseError(firebaseError)
    }
  }

  const signUpValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required'),
  })

return (
    <SafeAreaView style={styles.app}>
		<KeyboardAwareScrollView> 
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={{ flex: 1 }}>
				    <NavBar navigation={navigation}/>
                    <View style={styles.container}> 
                    <ScrollView contentContainerStyle={styles.scroll}
                        keyboardShouldPersistTaps="handled">
                        <Text style={[styles.header, { zIndex: 0 }]}>Sign In</Text>
                        <Formik
                          validationSchema={signUpValidationSchema}
                          initialValues={{
                            email: '',
                            password: ''
                          }}
                        onSubmit={async(values) => {
                          handleSignIn(values)
                          }}
                        >
                          {({ handleSubmit, isValid, setFieldValue }) => (
                            <>
                             <View style={{ width: "100%" }}> 
                                <TextInput style={[styles.input, focusedInput === "email" && styles.input_focused]}
                                placeholder="Email"
                                  onChangeText={(value) => {
                                    setFirebaseError('')
                                    setFieldValue("email", value)
                                }}
                                  onFocus={() => setFocusedInput("email")}
                                  onBlur={() => setFocusedInput(null)}
                                 
                                ></TextInput>
                                <Text style={firebaseError.length === 0 ? styles.textHide : styles.textShow}>{firebaseError}</Text>
                                <Field
                                component={CustomInput}
                                name="password"
                                placeholder="Password"
                                secureTextEntry
                                />
                            <View style={styles.button__container}> 
                                <TouchableOpacity disabled={!isValid || sending} style={[styles.button, 
                                    isSignInClicked ? styles.button__accent : null]} 
                                    onPress={handleSubmit}>
                                    <Text style={styles.button__text}>{sending ? "Signing In..." : "Sign In"}</Text>
                                </TouchableOpacity> 
                              </View>
                            </View>
                          </>
                        )}
                      </Formik>
                      <Text style={styles.link}
                      onPress={() => navigation.navigate("ResetPassword")}>
                        Forgot Password
                      </Text>
                    </ScrollView>
                  </View>
              </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
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
    padding: 30,
    marginTop: 30,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    display: 'flex',
    paddingTop: 50,
    paddingBottom: 80,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 80,
    width: "100%",
    backgroundColor: colours.bg,
    alignItems: "center",
    justifyContent: "center",
    
  },
  header: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 25,
    color: colours.accent1,
  },
  input: {
    width: "100%",
    borderColor: colours.accent4,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    color: colours.accent1,
    
  },
  input_focused: {
    borderColor: colours.accent4,
    borderWidth: 2,
  },
  button: {
    width: "60%",
    alignItems: "center",
    backgroundColor: colours.accent2,
    padding: 15,
    borderRadius: 5,
    marginBottom: 5,
  },
  button__text: {
    alignItems: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  textHide: {
    width: 0,
    height: 0,
    overflow: "hidden",
    opacity: 0
  },
  textShow: {
    overflow: "hidden",
    fontSize: 10,
    color: 'red',
    marginBottom: 10,
  },
  link: {
    color: colours.accent2,
    textDecorationLine: 'underline',
    fontSize: 12,
    
  }
});

