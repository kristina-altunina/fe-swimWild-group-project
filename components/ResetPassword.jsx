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
import { styles } from '../styles/layout';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomInput from "./CustomInput";
import { getFirebaseError } from "../extentions";
import { Formik, Field } from "formik";
import * as yup from 'yup';

export default ResetPassword = ({ navigation }) => {
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
        <SafeAreaView style={styles.app}>
		<KeyboardAwareScrollView> 
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={{ flex: 1 }}>
				    <NavBar navigation={navigation}/>
                    <View style={styles.container}> 
                    <ScrollView contentContainerStyle={customStyles.scroll}
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

const customStyles = StyleSheet.create({
  scroll: {
    padding: 50,
    paddingTop: 150,
    paddingBottom: 120,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});