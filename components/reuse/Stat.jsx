import { useFonts } from "expo-font";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAssets } from "expo-asset";

export function Stat({ icon, val }) {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  // these cannot be template literals for some reason...
  const [assets, error] = useAssets([
    require("../../assets/icons/resized/feelTemp.png"),
    require("../../assets/icons/resized/shore.png"),
    require("../../assets/icons/resized/clarity.png"),
    require("../../assets/icons/resized/recordTemp.png"),
    require("../../assets/icons/resized/sizeKey.png"),
    require("../../assets/icons/resized/bankAngle.png"),
    require("../../assets/icons/resized/mins.png"),
    require("../../assets/icons/resized/km.png"),
    require("../../assets/icons/resized/outOfDepth.png"),
  ]);

  if (val === null) return;

  const lookup = {
    feelTemp: 0,
    shore: 1,
    clarity: 2,
    recordTemp: 3,
    sizeKey: 4,
    bankAngle: 5,
    mins: 6,
    km: 7,
    outOfDepth: 8,
  };

  if (icon === "mins") {
    val += "m";
  }

  if (icon === "km") {
    val += "km";
  }

  if (icon === "outOfDepth") {
    val = val ? "deep" : "shallow";
  }

  return (
    <View style={styles.stat}>
      {assets && (
        <Image
          style={styles[`stat__icon--${icon}`]}
          resizeMode={"cover"}
          source={assets[lookup[icon]]}
        />
      )}
      <Text style={styles.stat__text}>{val}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stat: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  stat__text: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 10,
    marginRight: 10,
  },
  "stat__icon--feelTemp": {
    height: 28,
    width: 24,
    margin: 5,
  },
  "stat__icon--mins": {
    height: 30,
    width: 25,
    margin: 5,
  },
  "stat__icon--km": {
    height: 30,
    width: 30,
    margin: 5,
  },
  "stat__icon--outOfDepth": {
    height: 28,
    width: 20,
    margin: 5,
  },
  "stat__icon--sizeKey": {
    height: 23,
    width: 23,
    margin: 5,
  },
  "stat__icon--shore": {
    height: 28,
    width: 21.5,
    margin: 5,
  },
  "stat__icon--bankAngle": {
    height: 25,
    width: 25,
    margin: 5,
  },
  "stat__icon--recordTemp": {
    height: 29,
    width: 13.5,
    margin: 5,
  },
});
