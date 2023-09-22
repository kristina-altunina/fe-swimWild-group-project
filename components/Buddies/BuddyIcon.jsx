import { useEffect, useState } from "react";
import { DEFAULT_IMAGE_URL} from  "@env"
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image
  } from "react-native";

export default BuddyIcon = props => {
  
   const refreshToken = props.refreshToken;
   const { navigation } = props;
   
   const imageUrl = props.profileImg;
   const uid = props.uid
   return(
       <View>
            {imageUrl ? 
            <TouchableOpacity onPress={()=>{navigation.navigate("Buddy",{refreshToken: refreshToken, uid: uid})}}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: imageUrl,
              }}
            />
            </TouchableOpacity>
            : 
            <TouchableOpacity>
            <Image
            style={styles.tinyLogo}
            source={{
              uri: DEFAULT_IMAGE_URL
            }}
          />
          </TouchableOpacity>
          }
     </View>
   )
}

const styles = StyleSheet.create({
      tinyLogo: {
        width: 100,
        height:100,
      },
      logo: {
        width: 66,
        height: 58,
      }
     
  });
   