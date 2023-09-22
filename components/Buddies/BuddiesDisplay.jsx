import { useEffect, useState } from "react";
import { tokenRefresh } from "../../firebaseConfig";
import BuddyIcon from "./BuddyIcon";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image
  } from "react-native";

export default BuddiesDisplay = props => {
    console.log(props)
  const refreshToken = props.refreshToken;

  const [buddiesData, setBuddiesData] = useState([])

  async function getBuddies(){
        //refresh the token
     const tokenObj = await tokenRefresh(refreshToken)

     // FETCH HERE to get the buddies and after getting the buddies order randomly and pick 4
  }
  useEffect(() => {
    getBuddies()
   }, [])  

   return(
    // https://reactnativeelements.com/docs/1.2.0/listitem implement list item or flat list here
       <View>
        <BuddyIcon refreshToken={refreshToken} profileImg={''} uid={1} />
      </View>
   )
   }
   