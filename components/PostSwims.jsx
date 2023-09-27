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
  const [notes, onChangeNotesInput] = useState("Enter comment here...");
  const [starRating, setStartRating] = useState(0);
  const [recordTemp, setRecordTemp] = useState(null);
  const [showTempWarning, setShowTempWarning] = useState(false);
  const [feelTemp, setFeelTemp] = useState("Select Feels like");
  const [mins, onChangeMins] = useState("");
  const [outOfDepth, setOutOfDepth] = useState(false);
  const [size, setSize] = useState("Select Size");
  const [shore, setShore] = useState("Select Shore");
  const [bankAngle, setBankAngle] = useState("Select Bank Angle");
  const [clarity, setClarity] = useState("Select Clarity");
  const [km, onChangeKm] = useState(null);
  const [imgUrls, setImgUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mediaPermission, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();
  
  const refreshToken = useSelector((state) => state.refresh_token);

  function handleFeelTempRef() {
    const feelTempRef = ["freezing", "cold", "average", "warm", "hot"];

    return feelTempRef.map((item, i) => {
      return { value: i, label: item };
    });
  }

  function handleSizeRef() {
    const sizeRef = ["tiny", "small", "medium", "large"];

    return sizeRef.map((item, i) => {
      return { value: i, label: item };
    });
  }

  function handleShoreRef() {
    const shoreRef = ["muddy", "rocky", "sandy", "pebbly", "grassy", "swampy"];

    return shoreRef.map((item, i) => {
      return { value: i, label: item };
    });
  }

  function handleBankAngleRef() {
    const bankAngleRef = ["shallow", "medium", "steep", "jump-in"];

    return bankAngleRef.map((item, i) => {
      return { value: i, label: item };
    });
  }

  function handleClarityRef() {
    const clarityRef = ["muddy", "murky", "average", "clear", "perfect"];

    return clarityRef.map((item, i) => {
      return { value: i, label: item };
    });
  }

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
      feelTemp,
      outOfDepth,
      size,
      shore,
      bankAngle,
      clarity,
      km,
      imgUrls,
    };

    if (!showTempWarning) {
      tokenRefresh(refreshToken)
      .then(({access_token}) => {
        postSwimSpot(access_token, body)
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
              <View style={{ width: "40%" }}>
                <Text>Feel Temp:</Text>
                <Dropdown
                  data={handleFeelTempRef()}
                  labelField="label"
                  valueField="value"
                  iconColor="black"
                  placeholder={feelTemp}
                  onChange={(item) => {
                    setFeelTemp((feelTemp) => item.label);
                  }}
                />
              </View>

              <View style={{ width: "40%" }}>
                <Text>Size:</Text>
                <Dropdown
                  data={handleSizeRef()}
                  labelField="label"
                  valueField="value"
                  iconColor="black"
                  placeholder={size}
                  onChange={(item) => {
                    setSize((size) => item.label);
                  }}
                />
              </View>
              <View style={{ width: "40%" }}>
                <Text>Shore:</Text>
                <Dropdown
                  data={handleShoreRef()}
                  labelField="label"
                  valueField="value"
                  iconColor="black"
                  placeholder={shore}
                  onChange={(item) => {
                    setShore((shore) => item.label);
                  }}
                />
              </View>
              <View style={{ width: "40%" }}>
                <Text>Shore:</Text>
                <Dropdown
                  data={handleBankAngleRef()}
                  labelField="label"
                  valueField="value"
                  iconColor="black"
                  placeholder={bankAngle}
                  onChange={(item) => {
                    setBankAngle((bankAngle) => item.label);
                  }}
                />
              </View>
              <View style={{ width: "40%" }}>
                <Text>Clarity:</Text>
                <Dropdown
                  data={handleClarityRef()}
                  labelField="label"
                  valueField="value"
                  iconColor="black"
                  placeholder={clarity}
                  onChange={(item) => {
                    setClarity((clarity) => item.label);
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
