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
    require("../../assets/icons/feelTemp.png"),
    require("../../assets/icons/shore.png"),
    require("../../assets/icons/clarity.png"),
    require("../../assets/icons/recordTemp.png"),
    require("../../assets/icons/sizeKey.png"),
    require("../../assets/icons/bankAngle.png"),
  ]);

  if (val === null) return;

  const lookup = {
    feelTemp: 0,
    shore: 1,
    clarity: 2,
    recordTemp: 3,
    sizeKey: 4,
    bankAngle: 5,
  };

  return (
    <View style={styles.stat}>
      {assets && (
        <Image
          style={styles.stat__icon}
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
    alignItems: "centre",
  },
  stat__text: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
  },
  stat__icon: {
    height: 20,
    width: 16,
  },
});
