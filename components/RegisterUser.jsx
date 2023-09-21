import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
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

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { colours } from "../styles/base";

import { pickImage, takePhoto } from "../scripts/image-picker";
import * as ImagePicker from 'expo-image-picker';

import { getFirebaseError, formatDate } from "../extentions";
import CustomInput from "./CustomInput";
import { Formik, Field } from "formik";
import * as yup from 'yup';

export default RegisterUser = ({ navigation }) => {
	const dateNow = new Date()
	const minimumDate = new Date(dateNow.getFullYear() - 18, dateNow.getMonth(), dateNow.getDay())
	const [dob, setDob] = useState(null);
	const [requestedDate, setRequestedDate] = useState("");
	const [focusedInput, setFocusedInput] = useState(null);
	const [isSignUpClicked, setIsSignUpClicked] = useState(false);
	const [selectedDate, setSelectedDate] = useState(minimumDate);
	const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [profileImgURL, setProfileImgURL] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const [sending, setSending] = useState(false);
  const [genericError, setGenericError] = useState('');
	
    const showDatePicker = () => {
		setDatePickerVisible(true);
	};

  const [mediaPermission, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

async function swimWildSignUp(token, refresh_token, uid, formData) {
    const data = {
      uid: uid,
      name: formData.fullName,
      nickname: formData.nickname,
      dob: requestedDate,
      profileImg: profileImgURL
      }
console.log(data);

setGenericError('')
  const response = await fetch("https://spike-auth-server.onrender.com/users", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })
if (!response.ok) {
  setSending(false)
  setIsSignUpClicked(false)
  if (response.status !== 400) {
  setGenericError('Something went wrong. Please try again later.')
  }
} else {
    await response.json()
    navigation.navigate('Profile',
    {refresh_token: refresh_token})
  }
} 

function imageUploadFromGallery() {
    if(mediaPermission?.status !== ImagePicker.PermissionStatus.GRANTED) {
      return requestMediaPermission()
    }
    pickImage(progress => {
      setUploadProgress(() => progress);
      progress >= 100 ? setIsUploading(() => false) : setIsUploading(() => true);
    })
    .then(url => {
      setProfileImgURL(url)
    })
  }

function imageUploadFromCamera() {
    if(cameraPermission?.status !== ImagePicker.PermissionStatus.GRANTED) {
      return requestCameraPermission()
    }
    takePhoto(progress => {
      setUploadProgress(() => progress);
      progress >= 100 ? setIsUploading(() => false) : setIsUploading(() => true);
    })
    .then(url => {
      setProfileImgURL(url)
    })
  }

const signUpValidationSchema = yup.object().shape({
    fullName: yup
      .string()
      .matches(/(\w.+\s).+/, 'Enter at least 2 names')
      .required('Full name is required'),
    nickname: yup
      .string()
      .min(3, ({ min }) => `Nickname must be at least ${min} characters`)
      .required('Nickname is required'),
    dob: yup    
      .string() 
      .required('Date of Birth is required'),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required('Email is required'),
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
      .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
      .matches(/\d/, "Password must have a number")
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Confirm password is required'),
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
                        <Text style={[styles.header, { zIndex: 0 }]}>Register</Text>
                        <Formik
                          validationSchema={signUpValidationSchema}
                          initialValues={{
                            fullName: '',
                            nickname: '',
                            dob: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            profileImgURL: ''
                          }}
                        onSubmit={async(values) => {
                            setFirebaseError('')
                            setSending(true)
                            setIsSignUpClicked(true)
                            try {
                                const response = await createUserWithEmailAndPassword(auth, values.email, values.password)
                                const user = response.user
                                swimWildSignUp(user.stsTokenManager.accessToken, user.stsTokenManager.refreshToken, user.uid, values)
                            }
                            catch(error) {
                                setSending(false)
                                setIsSignUpClicked(false)
                                const firebaseEmailError = getFirebaseError(error);
                                setFirebaseError(firebaseEmailError)
                            }
                          }}
                        >
                          {({ handleSubmit, isValid, setFieldValue, errors }) => (
                            <>
                             <View style={{ width: "100%" }}> 
                                <Field
                                component={CustomInput}
                                name="fullName"
                                placeholder="Full Name"
                                />
                                <Field
                                component={CustomInput}
                                name="nickname"
                                placeholder="Nickname"
                                />
                                <TextInput style={[styles.input, focusedInput === "dob" && styles.input_focused]}
                                  placeholder="Select date of birth"
                                  value={dob}
                                  onChangeText={(value) => {setFieldValue("dob", value)}}
                                  onFocus={() => setFocusedInput("dob")}
                                  onBlur={() => setFocusedInput(null)}
                                  onPressIn={showDatePicker}
                                >
                                  </TextInput> 
                                  <DateTimePickerModal
                                  maximumDate={new Date("2005-09-15")}
                                  date={selectedDate}
                                  isVisible={datePickerVisible}
                                  mode="date"
                                  locale="en_GB"
                                  timeZoneOffsetInMinutes={0}
                                  onConfirm={(date) => {
                                        const val = formatDate(date.toISOString().split('T')[0], '-')
                                        setSelectedDate(date);
                                        setRequestedDate(date.toISOString());
                                        setDob(val);
                                        console.log(date.toISOString());
                                        hideDatePicker();
                                        setFieldValue("dob", val)
                                    }}
									              onCancel={hideDatePicker}
								                />
                                <Field
                                component={CustomInput}
                                name="email"
                                placeholder="Email Address"
                                keyboardType="email-address"
                                />
                                <Text style={firebaseError.length === 0 ? styles.textHide : styles.textShow}>{firebaseError}</Text>
                                <Field
                                component={CustomInput}
                                name="password"
                                placeholder="Password"
                                secureTextEntry
                                />
                                <Field
                                component={CustomInput}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                secureTextEntry
                                />
                            <View style={styles.button__container}> 
                                <TouchableOpacity style={styles.upload__button} onPress={imageUploadFromGallery}>
                                    <Text style={styles.button__text}>Select Photo</Text>
                                </TouchableOpacity>
                                <StatusBar style="auto" />
                                <TouchableOpacity style={styles.camera__button} onPress={imageUploadFromCamera}>
                                    <Text style={styles.button__text}>Take a Photo</Text>
                                </TouchableOpacity>
                                <StatusBar style="auto" />
                            </View>
                            <View> 
                                <View style={isUploading ? styles.progressBarContainerShow : styles.progressBarContainerHidden}>
                                    <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
                                </View>
                            </View>
                            <View style={styles.button__container}> 
                                <TouchableOpacity disabled={!isValid || sending} style={[styles.button, 
                                    isSignUpClicked ? styles.button__accent : null]} 
                                    onPress={handleSubmit}>
                                    <Text style={styles.button__text}>{sending ? "Signing Up..." : "Sign Up"}</Text>
                                </TouchableOpacity> 
                              </View>
                            </View>
                          <Text style={genericError.length === 0 ? styles.textHide : styles.generic__error}>{genericError}</Text>
                          </>
                        )}
                      </Formik>
                    </ScrollView>
                  </View>
              </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  button__container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    width: "60%",
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
    flex: 1,
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
  },
  progressBarContainerHidden: {
		width: "100%",
		height: 20,
		backgroundColor: "grey",
		borderRadius: 20,
		marginBottom: 10,
		overflow: "hidden",
        opacity: 0
	},
  progressBarContainerShow: {
		width: "100%",
		height: 20,
		backgroundColor: "grey",
		borderRadius: 20,
		marginBottom: 10,
		overflow: "hidden"
	},
	progressBar: {
		height: "100%",
		backgroundColor: colours.accent2,
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
    generic__error: {
      overflow: "hidden",
      fontSize: 10,
      color: 'red',
      marginTop: -7,
      alignItems: "center"
    },
});
