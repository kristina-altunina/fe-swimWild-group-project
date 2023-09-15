import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from "react-native";

import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { colours } from "../styles/base";
import NavBar from "./NavBar";

export default Profile = ({ navigation, route }) => {
 const data = route.params.data.greeting
 console.log(route.params, `ROUTE`)

    function handleSignOut() {
        signOut(auth)
          .then(() => {
            navigation.navigate('Home')
          })
          .catch((error) => {
            console.log(error)
          });
      }

return (
    <View style={styles.app}>
    <NavBar/>
        <View style={styles["container"]}>
        <Text>{data}</Text>
        <TouchableOpacity style={styles["button"]} onPress={handleSignOut}>
            <Text style={styles["button__text"]}>Sign Out</Text>
            </TouchableOpacity>
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
      }
  });