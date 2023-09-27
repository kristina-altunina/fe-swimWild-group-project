import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colours } from "../../styles/base";
import { useFonts } from "expo-font";
import StarRating from "react-native-star-rating";

export function LocationPreview({ name, type, distance, avStars }) {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Regular_Italic": require("../../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Bold_Italic": require("../../assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.info}>
        <Text style={styles.text}>
          {type[0].toUpperCase() +
            type.split("").slice(1).join("") +
            `  |  ${distance}km`}
        </Text>
        <View style={styles.starContainer}>
          <StarRating
            disabled={true}
            maxStars={5}
            starSize={18}
            rating={avStars}
            fullStarColor="#FFC033"
            emptyStarColor="#DBDBDB"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 12,
    padding: 10,
    backgroundColor: colours.accent3Weak,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: colours.text,
    height: 25,
  },
  text: {
    fontSize: 14,
    color: colours.lightText,
    fontFamily: "Poppins-Regular",
  },
  starContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
});
