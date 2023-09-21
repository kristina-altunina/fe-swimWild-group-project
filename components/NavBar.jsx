import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { colours } from "../styles/base";

export default NavBar = ({navigation}) => {
return(
    <View style={styles.header}>
        <View style={styles.header__titleContainer}>
          <Text style={styles.header__title} onPress={() => {
            navigation.navigate('Home')
          }}>
            Swim <Text style={styles.header__titleAccent}>Wild</Text>
          </Text>
        </View>
        <View style={styles.header__buttons}>
          <TouchableOpacity style={styles.header__button}>
            <Text style={styles.header__buttonText} onPress={() => {
            navigation.navigate('Home')
          }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.header__button}
          onPress={() => {
            navigation.navigate('SignIn')
          }}
          >
            <Text style={styles.header__buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
)
}
const styles = StyleSheet.create({
    app: {
      backgroundColor: colours.bg,
      height: "100%",
      width: "100%",
    },
    header: {
      backgroundColor: colours.accent1,
      height: "fit-content",
      color: colours.text,
      marginTop: 50,
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "center",
    },
    header__titleContainer: {
      margin: 10,
    },
    header__title: {
      fontSize: 32,
      fontFamily: "Poppins_900Black",
      color: colours.text,
    },
    header__titleAccent: {
      color: colours.accent4,
    },
    header__buttons: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-around",
    },
    header__button: {
      marginRight: 20,
    },
    header__buttonText: {
      fontFamily: "Poppins_600SemiBold",
      fontSize: 20,
      color: colours.bg,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      width: "50%",
      borderColor: "#ccc",
      borderWidth: 1,
      marginBottom: 5,
      padding: 5,
    },
    button: {
      width: "50%",
      alignItems: "center",
      backgroundColor: "#ababab",
      padding: 5,
      borderRadius: 3,
      marginBottom: 5,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });
    