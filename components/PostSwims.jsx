import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import NavBar from "./NavBar";
import { props } from "../styles/postSwimSpot";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import StarRating from "react-native-star-rating";
import Checkbox from "expo-checkbox";
import { postSwimSpot } from "../scripts/axios";
import { colours } from "../styles/base";
import { takePhoto, pickImage } from "../scripts/image-picker";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";

import { useSelector } from "react-redux";
import { tokenRefresh } from "../firebaseConfig";



export default function PostSwims({
  navigation,
  route: {
    params: { location },
  },
}) {

  const [notes, onChangeNotesInput] = useState("");
  const [starRating, setStartRating] = useState(0);
  const [recordTemp, setRecordTemp] = useState(null);
  const [showTempWarning, setShowTempWarning] = useState(false);
  const [feelTemp, setFeelTemp] = useState('Select Feels like');
  const [mins, onChangeMins] = useState("");
  const [outOfDepth, setOutOfDepth] = useState(false);
  const [size, setSize] = useState('Select Size');
  const [shore, setShore] = useState('Select Shore');
  const [bankAngle, setBankAngle] = useState('Select Bank Angle');
  const [clarity, setClarity] = useState('Select Clarity');
  const [km, onChangeKm] = useState('');
  const [imgUrls, setImgUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mediaPermission, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();

  const {access_token} = useSelector((state) => state.refresh_token);

  const feelTempRef = ["freezing", "cold", "average", "warm", "hot"].map((item, i) => {
    return { value: i, label: item };
  })

  const sizeRef = ["tiny", "small", "medium", "large"].map((item, i) => {
    return { value: i, label: item }
  });

  const shoreRef = ["muddy", "rocky", "sandy", "pebbly", "grassy", "swampy"].map((item, i) => {
    return { value: i, label: item };
  });

  const bankAngleRef = ["shallow", "medium", "steep", "jump-in"].map((item, i) => {
    return { value: i, label: item };
  });

  const clarityRef = ["muddy", "murky", "average", "clear", "perfect"].map((item, i) => {
    return { value: i, label: item }
  });

  function imageUploadFromGallery() {
    if (mediaPermission?.status !== ImagePicker.PermissionStatus.GRANTED) {
      return requestMediaPermission();
    }
    pickImage((progress) => {
      setUploadProgress(() => progress);
      progress >= 100 ? setIsUploading(() => false) : setIsUploading(() => true);
    }).then((url) => {
      setImgUrls((imgUrls) => [...imgUrls, url]);
    });
  }

  function imageUploadFromCamera() {
    if (cameraPermission?.status !== ImagePicker.PermissionStatus.GRANTED) {
      return requestCameraPermission();
    }
    takePhoto((progress) => {
      setUploadProgress(() => progress);
      progress >= 100 ? setIsUploading(() => false) : setIsUploading(() => true);
    }).then((url) => {
      setImgUrls((imgUrls) => [...imgUrls, url]);
    });
  }

  function handleRecordTemp(num) {
    setRecordTemp((recordTemp) => num);
    if (num < -5 || num > 60) {
      return setShowTempWarning((showTempWarning) => true);
    } else {
      setShowTempWarning((showTempWarning) => false);
    }
  }

  

  function handleSubmit() {

    const body = {
      date: new Date(Date.now()).toISOString(),
      location,
      notes: notes === "Enter comment here..." ? "" : notes,
      stars: starRating,
      recordTemp: +recordTemp,
      feelTemp: /Select/gi.test(feelTemp) ? null : feelTemp,
      outOfDepth: /Select/gi.test(outOfDepth) ? null : outOfDepth,
      sizeKey: /Select/gi.test(size) ? null : size,
      shore: /Select/gi.test(shore) ? null : shore,
      bankAngle: /Select/gi.test(bankAngle) ? null : bankAngle,
      clarity: /Select/gi.test(clarity) ? null : clarity,
      km,
      imgUrls,
    };

    if (!showTempWarning) {

      postSwimSpot(access_token, body)
      .then(() => {
        navigation.navigate('SingleLocation',{uid: location.id})
      })
      .catch(err => {
        console.log(err, 'first catch error in postSwims')
        tokenRefresh(access_token)
        .then(({access_token}) => {
          return postSwimSpot(access_token, body)
        })
        .then(() => {
          navigation.navigate('SingleLocation',{uid: location.id})
        })
        .catch(err => {
          console.log(err, 'second catch error in postSwims')
        })
      })
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={props.KeyboardAvoidingView.behavior}
      keyboardVerticalOffset={props.KeyboardAvoidingView.keyboardVerticalOffset}
    >
        <ScrollView>
      <NavBar navigation={navigation} />
      
      <View style={{ width: "100%", height: "auto", display: "flex", gap: 3, marginBottom: 10}}>
       
          <View
            style={{
              width: "100%",
              backgroundColor: colours.accent2,
              padding: "2%",
            }}
          >
            <Text
              style={{
                fontSize: 35,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
              }}
            >
              {location.name}
            </Text>
          </View>

          <View>
            <View
              style={{
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 20,
                backgroundColor: colours.bg,
                margin: "1%",
              }}
            >
              <TextInput
                multiline={true}
                numberOfLines={5}
                maxLength={250}
                placeholder="Enter Comments Here.."
                onChangeText={(text) => onChangeNotesInput(text)}
                value={notes}
                style={{ padding: 10 }}
              />
            </View>
            <View style={{ padding: "1%", display: "flex", gap: 5 }}>
              <View
                style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
              ></View>
              <View
                style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
              ></View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                }}
              >
                <Text>Rating:</Text>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  starSize={18}
                  rating={starRating}
                  fullStarColor="yellow"
                  selectedStar={(rating) => setStartRating((starRating) => rating)}
                />
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Text>Temp:</Text>
                <TextInput
                  maxLength={2}
                  onChangeText={(num) => handleRecordTemp(num)}
                  value={recordTemp}
                  inputMode="numeric"
                  keyboardType="numeric"
                  style={{
                    borderColor: "black",
                    borderWidth: 1,
                    width: "15%",
                    borderRadius: 10,
                    paddingLeft: "5%",
                  }}
                />
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Text>Mins:</Text>
                <TextInput
                  inputMode="numeric"
                  keyboardType="numeric"
                  maxLength={40}
                  onChangeText={(num) => onChangeMins(num)}
                  value={mins}
                  style={{
                    borderColor: "black",
                    borderWidth: 1,
                    width: "15%",
                    borderRadius: 10,
                    paddingLeft: "5%",
                  }}
                />
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Text>km:</Text>
                <TextInput
                  inputMode="numeric"
                  keyboardType="numeric"
                  maxLength={40}
                  onChangeText={(num) => onChangeKm(num)}
                  value={km}
                  style={{
                    borderColor: "black",
                    borderWidth: 1,
                    width: "15%",
                    borderRadius: 10,
                    paddingLeft: "5%",
                  }}
                />
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Text>Out of depth:</Text>
                <Checkbox
                  disabled={false}
                  value={outOfDepth}
                  onValueChange={(val) => setOutOfDepth((outOfDepth) => val)}
                />
              </View>
              <Text style={showTempWarning ? { color: "black" } : { height: 0 }}>
                min : -5, max: 60, unit Celsius
              </Text>
              <View style={{ width: "50%" }}>
                <Text>Feel Temp:</Text>
                <Dropdown
                  data={feelTempRef}
                  labelField="label"
                  valueField="value"
                  iconColor="black"
                  placeholder={feelTemp}
                  onChange={(item) => {
                    setFeelTemp(item.label);
                  }}
                />
              </View>

              <View style={{ width: "50%" }}>
                <Text>Size:</Text>
                <Dropdown
                  data={sizeRef}
                  labelField="label"
                  valueField="value"
                  iconColor="black"
                  placeholder={size}
                  onChange={(item) => {
                    setSize(item.label);
                  }}
                />
              </View>
              <View style={{ width: "50%" }}>
                <Text>Shore:</Text>
                <Dropdown
                  data={shoreRef}
                  labelField="label"
                  valueField="value"
                  iconColor="black"
                  placeholder={shore}
                  onChange={(item) => {
                    setShore(item.label);
                  }}
                />
              </View>
              <View style={{ width: "50%" }}>
                <Text>Bank Angle:</Text>
                <Dropdown
                  data={bankAngleRef}
                  labelField="label"
                  valueField="value"
                  iconColor="black"
                  placeholder={bankAngle}
                  onChange={(item) => {
                    setBankAngle(item.label);
                  }}
                />
              </View>
              <View style={{ width: "50%" }}>
                <Text>Clarity:</Text>
                <Dropdown
                  data={clarityRef}
                  labelField="label"
                  valueField="value"
                  iconColor="black"
                  placeholder={clarity}
                  onChange={(item) => {
                    setClarity(item.label);
                  }}
                />
              </View>
              {imgUrls.length ? (
                <View style={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
                  {imgUrls.map((item, i) => {
                    return (
                      <Image key={i} style={{ width: 50, height: 50 }} source={{ uri: item }} />
                    );
                  })}
                </View>
              ) : (
                <Text style={{ textAlign: "center" }}>No Pictures</Text>
              )}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    marginRight: 15,
                    width: "40%",
                    alignItems: "center",
                    backgroundColor: colours.accent4,
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 5,
                  }}
                  onPress={imageUploadFromGallery}
                >
                  <Text
                    style={{
                      alignItems: "center",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Select Photo
                  </Text>
                </TouchableOpacity>
                <StatusBar style="auto" />
                <TouchableOpacity
                  style={{
                    flex: 1,
                    width: "40%",
                    alignItems: "center",
                    backgroundColor: colours.accent4,
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 5,
                  }}
                  onPress={imageUploadFromCamera}
                >
                  <Text
                    style={{
                      alignItems: "center",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Take a Photo
                  </Text>
                </TouchableOpacity>
                <StatusBar style="auto" />
              </View>
              <View>
                <View
                  style={
                    isUploading
                      ? styles.progressBarContainerShow
                      : styles.progressBarContainerHidden
                  }
                >
                  <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: "60%",
                alignItems: "center",
                backgroundColor: colours.accent2,
                padding: 15,
                borderRadius: 5,
              }}
              onPress={() => handleSubmit()}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: colours.bg,
    height: "100%",
    width: "100%",
  },
  scroll: {
    padding: 50,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    opacity: 0,
  },
  progressBarContainerShow: {
    width: "100%",
    height: 20,
    backgroundColor: "grey",
    borderRadius: 20,
    marginBottom: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: colours.accent2,
  },
  textHide: {
    width: 0,
    height: 0,
    overflow: "hidden",
    opacity: 0,
  },
  textShow: {
    overflow: "hidden",
    fontSize: 10,
    color: "red",
    marginBottom: 10,
  },
  generic__error: {
    overflow: "hidden",
    fontSize: 10,
    color: "red",
    marginTop: -7,
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    borderColor: colours.accent4,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    color: colours.accent1,
  },
  errorText: {
    fontSize: 10,
    color: "red",
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  link: {
    color: colours.accent2,
    textDecorationLine: "underline",
    fontSize: 12,
  },
  firebase__error: {
    overflow: "hidden",
    fontSize: 10,
    color: "red",
    marginTop: -7,
    alignItems: "center",
  },
});
