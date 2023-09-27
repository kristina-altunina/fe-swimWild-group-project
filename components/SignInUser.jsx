import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { styles } from "../styles/layout";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getFirebaseError, generateGuid } from "../extentions";
import CustomInput from "./CustomInput";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { refreshToken } from "../redux/reducers";

export default SignInUser = ({ navigation }) => {
  const dispatch = useDispatch();

  const [focusedInput, setFocusedInput] = useState(null);
  const [isSignInClicked, setIsSignInClicked] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSignIn(values, callbackFunc) {
    setFirebaseError("");
    setSending(true);
    setIsSignInClicked(true);

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = response.user;
      console.log(user);
      dispatch(
        refreshToken({ refresh_token: user.stsTokenManager.refreshToken })
      );
      setSending(false);
      setIsSignInClicked(false);
      callbackFunc();
      navigation.navigate("Profile", {
        refresh_token: user.stsTokenManager.refreshToken,
        guid: generateGuid(),
      });
    } catch (error) {
      console.log("ERROR", error);
      setSending(false);
      setIsSignInClicked(false);
      const firebaseError = getFirebaseError(error);
      setFirebaseError(firebaseError);
    }
  }

  const signUpValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  return (
    <SafeAreaView style={styles.app}>
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <NavBar navigation={navigation} />
            <View>
              <ScrollView
                contentContainerStyle={customStyles.scroll}
                keyboardShouldPersistTaps="handled"
              >
                <Text style={[styles.header, { zIndex: 0 }]}>Sign In</Text>
                <Formik
                  validationSchema={signUpValidationSchema}
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={async (values, { resetForm }) => {
                    handleSignIn(values, function () {
                      console.log("reset form");
                      resetForm();
                    });
                  }}
                >
                  {({ handleSubmit, isValid, setFieldValue, values }) => (
                    <>
                      <View style={{ width: "100%" }}>
                        <TextInput
                          style={[
                            styles.input,
                            focusedInput === "email" && styles.input_focused,
                          ]}
                          placeholder="Email"
                          value={values.email}
                          onChangeText={(value) => {
                            setFirebaseError("");
                            setFieldValue("email", value);
                          }}
                          onFocus={() => setFocusedInput("email")}
                          onBlur={() => setFocusedInput(null)}
                        ></TextInput>
                        <Text
                          style={
                            firebaseError.length === 0
                              ? styles.textHide
                              : styles.textShow
                          }
                        >
                          {firebaseError}
                        </Text>
                        <Field
                          component={CustomInput}
                          name="password"
                          placeholder="Password"
                          secureTextEntry
                        />
                        <View style={styles.button__container}>
                          <TouchableOpacity
                            disabled={!isValid || sending}
                            style={[
                              styles.button,
                              isSignInClicked ? styles.button__accent : null,
                            ]}
                            onPress={handleSubmit}
                          >
                            <Text style={styles.button__text}>
                              {sending ? "Signing In..." : "Sign In"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </>
                  )}
                </Formik>
                <View>
                  <Text
                    style={styles.link}
                    onPress={() => {
                      console.log("CLICK RESET PASS");
                      navigation.navigate("ResetPassword");
                    }}
                  >
                    Forgot Password
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const customStyles = StyleSheet.create({
  scroll: {
    padding: 50,
    paddingTop: 120,
    paddingBottom: 120,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
