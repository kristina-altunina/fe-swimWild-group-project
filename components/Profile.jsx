import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  ScrollView,
  LayoutAnimation,
  useWindowDimensions,
} from "react-native";

import { pickImage } from "../scripts/image-picker";
import { colours } from "../styles/base";
import NavBar from "./NavBar";
import { tokenRefresh } from "../firebaseConfig";
import { BACKEND_API_URL, DEFAULT_IMAGE_URL, PENCIL_ICON } from "@env";
import { useState, useEffect } from "react";
import { formatDate, simpleAlert } from "../extentions";
import SwimFilter from "./Profile/SwimFilter";
import {
  addMonthToSwims,
  coldest,
  favouriteSwim,
  hottest,
  swimTheLakes,
  swimsThisMonth,
  totalDistance,
  totalLocations,
  totalMinutes,
} from "../scripts/swims";
import { SwimRecord } from "./Profile/SwimRecord";
import * as ImagePicker from "expo-image-picker";
import { useFonts } from "expo-font";
import { login, refreshToken } from "../redux/reducers";
import { useSelector, useDispatch } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useAssets } from "expo-asset";


export default Profile = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({});
  const [swims, setSwims] = useState([]);
  const [filtSwims, setFiltSwims] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bio, setBio] = useState("");
  const [myLocation, setMyLocation] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [expand, setExpand] = useState(false);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Regular_Italic": require("../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Bold_Italic": require("../assets/fonts/Poppins-BoldItalic.ttf"),
  });
  const [assets, error] = useAssets([require("../assets/icons/pencil.png")]);

  const dispatch = useDispatch();
  
  //Important: all userSelector need to be done first before accessing the variable
  const stateUid = useSelector((state) => state.uid);
  const stateToken = useSelector((state) => state.refresh_token);

  const currentUserUid = route.params.currentUserUid || stateUid;
  const otherUserUid = route.params.uid;
  const token = route.params.refresh_token || stateToken;
  const guid = route.params.guid;
  const isCurrentUser = otherUserUid == undefined || otherUserUid === currentUserUid;
  const [mediaPermission, requestMediaPermission] =
    ImagePicker.useMediaLibraryPermissions();


async function getProfile(){
  const tokenObj = await tokenRefresh(token)
  const url = BACKEND_API_URL + (isCurrentUser ? "/users/profile": ("/users/" + otherUserUid));
  dispatch(refreshToken({ refresh_token: tokenObj!=undefined ? tokenObj.refresh_token || '':'' }))
  setIsLoading(true);
  fetch(url, {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenObj!= undefined? tokenObj.access_token|| '':''}`,
    }
  })
  .then(response => response.json())
  .then((json)=> {
    console.log('DAT DAT', json)
    json.dob = formatDate(json.dob.split('T')[0],'-')
    setProfileData(json)
    const swimData = addMonthToSwims(json.swims);
    setSwims(swimData);
    setFiltSwims(swimData);
    setIsLoading(false);
  }).catch((error)=>{
    console.log('PROFILE ERROR', error)
    simpleAlert("Profile", "Failed to load profile");
  })
}

  function imageUploadFromGallery() {
    if (mediaPermission?.status !== ImagePicker.PermissionStatus.GRANTED) {
      return requestMediaPermission();
    }
    pickImage((progress) => {
      setUploadProgress(() => progress);
      progress >= 100
        ? setIsUploading(() => false)
        : setIsUploading(() => true);
    }).then((url) => {
      setProfileImg(url);
    });
  }

  function handleCancel() {
    setEditMode(false);
    setBio(profileData.bio);
    setProfileImg(profileData.profileImg);
    setMyLocation(profileData.home);
  }

  async function saveData() {
    const tokenObj = await tokenRefresh(token);
    const data = {
      nickname: profileData.nickname,
      profileImg: profileImg,
      home: myLocation,
      bio: bio,
    };
    console.log(data);

    setSaving(true);
    const url = BACKEND_API_URL + "/users";
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenObj.access_token}`,
      },
      body: JSON.stringify(data),
    });
    setSaving(false);
    if (!response.ok) {
      const body = await response.json();
      console.log(body);
      simpleAlert("Profile", "Failed to update profile");
    } else {
      setEditMode(false);
      if (isCurrentUser) {
        dispatch(login({ profileUrl: profileImg, name: profileData.name }));
      }
      simpleAlert("Profile", "Profile updated");
      await response.json();
    }
  }
  useEffect(
    (guid) => {
      console.log("CALLING GET PROFILE", guid);
      getProfile();
    },
    [guid]
  );

  useEffect(() => {
    if (isCurrentUser) {
      // only if user is authenticated, update the store and the state fields
      dispatch(
        login({ profileUrl: profileData.profileImg, name: profileData.name })
      );
    }
    setMyLocation(profileData.home);
    setBio(profileData.bio);
    setProfileImg(profileData.profileImg);
  }, [profileData]);

  if (isLoading || !fontsLoaded) {
    return (
      <View>
        <NavBar navigation={navigation} />
        <ActivityIndicator style={styles.loader} size="xlarge" />
      </View>
    );
  }


  return (
    <View style={styles.app}>
      <NavBar navigation={navigation} />
      <View style={styles.profile}>
        <View style={styles.profile__text}>
        <View style={styles.profile__nameContainer}>
          <Text style={styles.profile__name}>{profileData.name}</Text>
            <TouchableOpacity
              onPress={() => setEditMode(true)}
              style={[
                !editMode && isCurrentUser ? styles.textShow : styles.textHide,
              ]}
            >
              <Image
                source={{ uri: PENCIL_ICON }}
                resizeMode={"cover"}
                style={styles.profile__edit}
              ></Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.profile__nickname}>{profileData.nickname}</Text>
          {/* <Text style={styles.profile__home}>{profileData.dob}</Text> */}
          <TextInput
            onChangeText={(value) => setMyLocation(value)}
            editable={editMode}
            placeholder={editMode ? "Your location" : ""}
            style={[
              styles.profile__myLocation,
              editMode
                ? {
                    borderWidth: 2,
                    borderColor: colours.accent4,
                    paddingLeft: 8,
                    marginTop: 8,
                  }
                : { borderWidth: 0 },
            ]}
          >
            {profileData.home}
          </TextInput>
          <View>
            <TextInput
              placeholder="About me"
              editable={editMode}
              value={bio}
              selectTextOnFocus={editMode}
              multiline={true}
              numberOfLines={10}
              onChangeText={(value) => setBio(value)}
              style={[
                styles.profile__bio,
                editMode
                  ? {
                      borderWidth: 2,
                      borderColor: colours.accent4,
                      padding: 8,
                      paddingLeft: 8,
                      fontSize: 14,
                      marginTop: 3,
                    }
                  : { borderWidth: 0 },
              ]}
            />
          </View>
        </View>

        <View style={styles.profile__imgContainer}> 
          <TouchableHighlight
            onPress={imageUploadFromGallery}
            disabled={!editMode}
          >
            <Image
              style={[
                styles.profile__img,
                editMode
                  ? { borderWidth: 3, borderColor: colours.accent4 }
                  : {},
              ]}
              resizeMode={"cover"}
              source={{
                uri: profileImg || DEFAULT_IMAGE_URL, 
              }}
            />
          </TouchableHighlight>
        {/* <TouchableOpacity
          style={styles.upload__button}
          onPress={imageUploadFromGallery}
        >
          <Text style={styles.uploading}>
            {uploadProgress < 100 ? "Uploading..." : "Edit Photo"}
          </Text>
        </TouchableOpacity> */}
        
      <View style={[
          styles.button__container,
          editMode ? styles.textShow : styles.textHide,
        ]}
      >
        <TouchableOpacity onPress={saveData} style={[styles.button]}>
          <Text style={styles.button__text}>
            {saving ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancel} style={[styles.button]}>
          <Text style={styles.button__text}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          setExpand((bool) => !bool);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }}
      >
        <View style={styles.stats}>
          <View style={styles.stats__left}>
            <Text style={styles.stats__label}>
              <Text style={styles.stats__stat}>{swims ? swims.length : 0}</Text>{" "}
              swims total
            </Text>
            <Text style={styles.stats__label}>
              <Text style={styles.stats__stat}>{swimsThisMonth(swims)}</Text>{" "}
              swims this month
            </Text>
            <Text style={styles.stats__label}>
              Last swam on{" "}
              {swims && swims.length > 0 ? (
                <Text style={styles.stats__stat}>
                  {new Date(swims[0].date)
                    .toDateString()
                    .split(" ")
                    .slice(1, 3)
                    .join(" ")}
                </Text>
              ) : (
                <Text>...never?</Text>
              )}
            </Text>
            {!expand && (
              <TouchableOpacity>
                <Text style={styles.seeMore}>See more...</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.stats__right}>
            <Text style={styles.stats__label}>
              Loves{" "}
              <Text style={styles.stats__stat}>
                {favouriteSwim(swims || [])}
              </Text>
            </Text>
            <Text style={styles.stats__challenge}>
              Swim the Lakes:{"  "}
              <Text style={styles.stats__stat}>
                {swimTheLakes(swims || [])}
              </Text>
            </Text>
          </View>
          {expand && swims && swims.length && (
            <View style={styles.stats__bottom}>
              {coldest(!swims || []) && (
                <Text style={styles.stats__label}>
                  Suffered{" "}
                  <Text style={styles.stats__stat}>
                    {coldest(swims).split(",")[0]}
                  </Text>{" "}
                  on{coldest(swims).split(",").slice(1).join(", ")}
                </Text>
              )}
              {hottest(swims) && (
                <Text style={styles.stats__label}>
                  Enjoyed{" "}
                  <Text style={styles.stats__stat}>
                    {hottest(swims).split(",")[0]}
                  </Text>{" "}
                  on{hottest(swims).split(",").slice(1).join(", ")}
                </Text>
              )}
              {totalLocations(swims) && (
                <Text style={styles.stats__label}>
                  Swam in{" "}
                  <Text style={styles.stats__stat}>
                    {totalLocations(swims)}
                  </Text>{" "}
                  different locations
                </Text>
              )}
              {totalMinutes(swims) && (
                <Text style={styles.stats__label}>
                  Total immersion time:{"  "}
                  <Text style={styles.stats__stat}>{totalMinutes(swims)}</Text>
                </Text>
              )}
              {totalDistance(swims) && (
                <Text style={styles.stats__label}>
                  Total distance swam:{"  "}
                  <Text style={styles.stats__stat}>{totalDistance(swims)}</Text>
                </Text>
              )}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <SwimFilter
        allSwims={swims}
        filtSwims={filtSwims}
        setFiltSwims={setFiltSwims}
      />
      <ScrollView>
        {filtSwims != undefined ||
          (!filtSwims.length && (
            <Text style={styles.empty}>Nothing here!</Text>
          ))}
        {filtSwims.map((swim) => {
          return (
            <SwimRecord swim={swim} key={swim._id} navigation={navigation} />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: colours.bg,
    height: "100%",
    width: "100%",
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: 8,
    paddingLeft: 6, 
    marginTop: -25,
  },
  profile__text: {
    minWidth: 0,
    width: "60%",
    marginRight: 0,
    padding: 5,
    color: colours.text,
  }, 
   profile__nameContainer: {
    flexDirection: 'row', 
    alignItems: 'flex-start',
    width: 200, 
  },
  profile__name: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: colours.text,
    overflowWrap: 'break-word', 
    maxWidth: '100%',  
  },
  profile__edit: {
    minHeight: 0,
    height: 20,
    width: 20,
    margin: 0,
    padding: 0,
    marginLeft: 3,
    marginTop: 3,
  },
  profile__imgContainer: {
    marginRight: 10,
    marginTop: 15,
    alignItems: "center",
    width: 143,
  },
  button__container: {
  flexDirection: "row",
  alignItems: "center",
  width: 140,
  justifyContent: "center",
  padding: 3,
  },
  button: {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: 63, 
  margin: 2,
  backgroundColor: colours.accent2,
  padding: 3,
  borderRadius: 5,
  },
  button__text: {
    alignItems: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
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
    marginBottom: 10,
  },
  profile__nickname: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: colours.lightText,
    height: 22,
  },
  profile__home: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: colours.lightText,
  },
  profile__myLocation: {
    borderColor: colours.lightText,
    borderWidth: 1,
    borderRadius: 3,
    marginRight: 60,
    paddingTop: 0,
    marginBottom: 0,
    paddingBottom: 5,
    paddingLeft: 0,
    fontFamily: "Poppins-Light",
  },
  profile__bio: {
    fontSize: 16,
    marginRight: 10,
    paddingBottom: 6,
    paddingBottom: 0,
    paddingLeft: 0,
    fontFamily: "Poppins-Regular_Italic",
    color: colours.text,
    borderColor: colours.accent3,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 0,
    height: 100,
    textAlignVertical: "top",
  },
  profile__img: {
    aspectRatio: 1,
    minWidth: 0,
    width: "100%",
    overflow: "hidden",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colours.accent3,
  },
  uploading: {
    alignItems: "center",
    color: colours.accent2,
    fontWeight: "bold",
    fontSize: 13,
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: colours.accent3Weak,
    padding: 12,
    rowGap: 12,
    marginTop: 0,
  },
  stats__left: {
    width: "48%",
    minWidth: 0,
  },
  stats__right: {
    width: "48%",
    minWidth: 0,
    textAlign: "right",
  },
  stats__label: {
    fontFamily: "Poppins-Light",
    color: colours.text,
  },
  stats__challenge: {
    fontFamily: "Poppins-Bold_Italic",
    color: colours.blueAccent,
  },
  stats__stat: {
    fontFamily: "Poppins-Bold",
    color: colours.text,
    overflow: "hidden",
  },
  loader: {
    height: "100%",
    position: "absolute",
    top: 350,
    left: "45%",
  },
  empty: {
    fontFamily: "Poppins-Light",
    color: colours.lightText,
    textAlign: "center",
  },
  seeMore: {
    fontFamily: "Poppins-SemiBold",
    color: colours.accent1,
    fontSize: 12,
  },
});