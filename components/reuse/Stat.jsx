import { useFonts } from "expo-font";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAssets } from "expo-asset";
import { colours } from "../../styles/base";

export function Stat({ icon, val, big }) {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
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

  const lookupExtra = {
    feelTemp: "Temperature feels...",
    shore: "Shore is...",
    clarity: "Water quality is...",
    recordTemp: "",
    sizeKey: "Swimming area is...",
    bankAngle: "Angle of entry is...",
    mins: "You'll swim for...",
    km: "Average distance",
    outOfDepth: "Water is...",
  };

  if (icon === "mins") {
    if (big) {
      val += " mins";
    } else {
      val += "m";
    }
  }

  if (icon === "km") {
    val += "km";
  }

  if (icon === "outOfDepth") {
    val = val ? "deep" : "shallow";
  }

  if (typeof val === "object") {
    let newVal = "";
    for (const key in val) {
      val += key;
    }
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
      {big ? (
        <View style={styles.stat__info}>
          <Text style={styles.stat__extra}>{lookupExtra[icon]}</Text>
          <Text style={styles["stat__text--big"]}>{val}</Text>
        </View>
      ) : (
        <Text style={styles.stat__text}>{val}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stat: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  stat__info: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    rowGap: 0,
  },
  stat__text: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 10,
    marginRight: 10,
    marginLeft: 0,
    color: colours.text,
  },
  stat__extra: {
    fontFamily: "Poppins-Regular",
    width: "80%",
    height: 18.5,
    padding: 0,
    marginBottom: 0,
    zIndex: 3,
    fontSize: 13,
    marginLeft: 10,
    color: colours.text,
  },
  "stat__text--big": {
    fontFamily: "Poppins-Bold",
    fontSize: 13,
    margin: 0,
    padding: 0,
    marginRight: 3,
    height: 30,
    marginLeft: 10,
    color: colours.accent1,
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
    marginRight: 3,
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
    marginLeft: 7,
    marginRight: 6.5,
  },
  "stat__icon--sizeKey": {
    height: 23,
    width: 23,
    margin: 5,
    marginLeft: 7,
    marginRight: 3,
  },
  "stat__icon--shore": {
    height: 28.5,
    width: 22.5,
    margin: 5,
    marginLeft: 8,
    marginRight: 3,
  },
  "stat__icon--bankAngle": {
    height: 25.5,
    width: 26,
    margin: 5,
    marginLeft: 5,
    marginRight: 2,
  },
  "stat__icon--recordTemp": {
    height: 29,
    width: 13.5,
    margin: 5,
  },
  "stat__icon--clarity": {
    height: 25,
    width: 16,
    margin: 5,
    marginLeft: 10,
    marginRight: 6,
  },
});
