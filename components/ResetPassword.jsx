import { useState } from "react";
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
import NavBar from "./NavBar";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { colours } from "../styles/base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomInput from "./CustomInput";
import { getFirebaseError } from "../extentions";
import { Formik, Field } from "formik";
import * as yup from 'yup';

export default ResetPassword = ({ navigation, route }) => {
    const [firebaseError, setFirebaseError] = useState("");
    const [resetting, setResetting] = useState(false);
    const [isResettingClicked, setResettingClicked] = useState(false);

    async function handleResetPassword(values) {
        setFirebaseError('')
        setResetting(true)
        try {
            console.log(auth, "<--- auth");
            const user = auth.currentUser;
            await sendPasswordResetEmail(auth, values.email)
            console.log(user);
            navigation.navigate('SignIn')
        }
        catch(error) {
            console.log(error, "three");
            setResetting(false)
            setResettingClicked(false)
            const firebaseError = getFirebaseError(error);
            setFirebaseError(firebaseError)
        }
      }

    const signUpValidationSchema = yup.object().shape({
        email: yup
          .string()
          .email("Please enter a valid email")
          .required('Email is required'),
      })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colours.bg }}>
		<KeyboardAwareScrollView> 
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={{ flex: 1 }}>
				    <NavBar />
                    <View style={styles.container}> 
                    <ScrollView contentContainerStyle={styles.scroll}
                        keyboardShouldPersistTaps="handled">
                        <Text style={[styles.header, { zIndex: 0 }]}>Reset Password</Text>
                        <Formik
                          validationSchema={signUpValidationSchema}
                          initialValues={{
                            email: '',
                            newPassword: '',
                            confirmPassword: ''
                          }}
                        onSubmit={async(values) => {
                            handleResetPassword(values)
                          }}
                        >
                          {({ handleSubmit, isValid, setFieldValue, errors }) => (
                            <>
                             <View style={{ width: "100%" }}> 
                                <Field
                                component={CustomInput}
                                name="email"
                                placeholder="Email Address"
                                keyboardType="email-address"
                                />
                                <Text style={firebaseError.length === 0 ? styles.textHide : styles.firebase__error}>{firebaseError}</Text>
                            <View style={styles.button__container}> 
                                <TouchableOpacity disabled={!isValid || resetting} style={[styles.button, 
                                    isResettingClicked ? styles.button__accent : null]} 
                                    onPress={handleSubmit}>
                                    <Text style={styles.button__text}>{resetting ? "Resetting..." : "Reset"}</Text>
                                </TouchableOpacity> 
                              </View>
                            </View>
                          </>
                        )}
                      </Formik>
                    </ScrollView>
                  </View>
              </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    </SafeAreaView>
)};


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
      borderColor: colours.accent1,
      borderWidth: 5
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
      borderColor: colours.accent2,
      borderWidth: 5
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
    firebase__error: {
        overflow: "hidden",
        fontSize: 10,
        color: 'red',
        marginTop: -7,
        alignItems: "center"
      },
  });
  
  