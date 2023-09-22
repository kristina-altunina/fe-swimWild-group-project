import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image
  } from "react-native";

import { colours } from "../styles/base";
import NavBar from "./NavBar";
import { tokenRefresh } from "../firebaseConfig";
import { BACKEND_API_URL, DEFAULT_IMAGE_URL } from "@env"
import { useState, useEffect } from "react";
import {formatDate} from '../extentions'
import BuddiesDisplay from "./Buddies/BuddiesDisplay";
export default Profile = ({ navigation, route }) => {
 const [profileData, setProfileData] = useState({})
 const [canEditAboutMe, setCanEditAboutMe] = useState(false)
 const [canEditImage, setCanEditImage] = useState(false)
 const refreshToken = route.params.refresh_token;
 
async function getProfile(){

  const tokenObj = await tokenRefresh(refreshToken)
 
  const url = BACKEND_API_URL + "/users/profile"
  fetch(url, {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenObj.access_token}`,
    }
  })
  .then(response => response.json())
  .then((json)=> {
    json.dob = formatDate(json.dob.split('T')[0],'-')
    setProfileData(json)
    console.log(json, "PROFILE")
  }).catch((error)=>{
    console.log(error)
  })
}
useEffect(() => {
   getProfile()
  }, [])  

useEffect(()=>{

},[canEditImage])
  const pic = 'https://reactnative.dev/img/tiny_logo.png'
return (
    <View style={styles.app}>
    <NavBar navigation={navigation}/>
        <View>
          <Text>Hi {profileData.name}</Text>
          <View>
            {profileData.profileImg ?  <Image
              style={styles.tinyLogo}
              source={{
                uri: profileData.profileImg,
              }}
            />: <Image
            style={styles.tinyLogo}
            source={{uri: DEFAULT_IMAGE_URL}}
          />}
          <TouchableOpacity style={canEditImage ? styles.textHide : styles.textShow} onPress={()=>{setCanEditImage(true)}}>
             <Text>Edit</Text>
          </TouchableOpacity>
          </View>
          <View> 
              <TouchableOpacity style={canEditImage ? styles.textShow: styles.textHide}>
                <Text>Select Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={canEditImage ? styles.textShow: styles.textHide}>
                <Text>Take a Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={canEditImage ? styles.textShow: styles.textHide}>
                <Text onPress={()=> setCanEditImage(false)}>Cancel</Text>
              </TouchableOpacity>
           </View>
            <View>
              <Text>{profileData.name}</Text>
              <Text>{profileData.nickname}</Text>
              <Text>{profileData.dob}</Text>
            </View>
            <View style={styles.textAreaContainer} >
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor="grey"
                numberOfLines={5}
                multiline={true}
                editable={canEditAboutMe}
              />
              <View>
                <TouchableOpacity style={canEditAboutMe ? styles.textHide : styles.textShow} onPress={()=>{setCanEditAboutMe(true)}}>
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={canEditAboutMe ? styles.textShow : styles.textHide} onPress={()=>{setCanEditAboutMe(false)}}>
                  <Text>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={canEditAboutMe ? styles.textShow : styles.textHide} onPress={()=>{setCanEditAboutMe(false)}}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
          </View>
          <BuddiesDisplay refreshToken={refreshToken}/>
        </View>
    </View>
  );
}

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
      image__container: {
        paddingTop: 50,
      },
      tinyLogo: {
        width: 140,
        height: 140,
      },
      logo: {
        width: 66,
        height: 58,
      },
      textAreaContainer: {
        borderColor: colours.accent1,
        borderWidth: 1,
        padding: 1
      },
      textArea: {
        height: 150,
        justifyContent: "flex-start",
        textAlignVertical: 'top'
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
        marginBottom: 10,
    },
  });