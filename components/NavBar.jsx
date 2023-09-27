import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { colours } from "../styles/base";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";

export default NavBar = ({ navigation }) => {
  const profileUrl = useSelector((state) => state.profileUrl);

  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    // Return a loading indicator or placeholder
    return <Text>Loading fonts...</Text>;
  }

  return (
    <View style={styles.header}>
      <View style={styles.header__titleContainer}>
        <Text
          style={styles.header__title}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          Swim{" "}
          <Text
            style={styles.header__titleAccent}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            Wild
          </Text>
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          {profileUrl ? (
            <Image
              source={{ uri: profileUrl }}
              style={{
                width: 45,
                height: 45,
                borderRadius: 40,
                marginRight: 10,
                borderColor: colours.accent4,
                borderWidth: 1,
              }}
            />
          ) : (
            <Entypo
              style={{ marginRight: 10 }}
              name={"dots-three-vertical"}
              size={25}
              color={colours.accent4}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  header__titleContainer: {
    margin: 10,
  },
  header__title: {
    fontSize: 32,
    fontFamily: "Poppins-Black",
    height: 50,
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
    fontFamily: "Poppins-SemiBold",
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
