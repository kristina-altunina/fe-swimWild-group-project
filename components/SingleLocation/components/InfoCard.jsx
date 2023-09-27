import { useEffect, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  LayoutAnimation,
  ActivityIndicator,
} from "react-native";
import { styles } from "../../../styles/infoCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";

export default function InfoCard({ info, api }) {
  const [expandData, setExpandData] = useState(false);
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../../../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Regular_Italic": require("../../../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../../../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Light": require("../../../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../../../assets/fonts/Poppins-Medium.ttf"),
  });

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setExpandData((expandData) => !expandData);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }}
      >
        {!Object.keys(info).length ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={styles.infoData}>
            <Text style={styles.titleText}>Recommendations</Text>
            <View style={styles.textWithInfoContainer}>
              <Ionicons
                name="alert-circle-outline"
                size={28}
                color="red"
                style={{ marginRight: 6, marginBottom: 3 }}
              />
              <Text style={styles.hazardText}>
                {info.hazards.join(". ") ||
                  "Always consult local rules and experience"}
              </Text>
            </View>
            {expandData ? (
              <>
                {api?.nearestAab && (
                  <Text style={styles.aabText}>
                    The nearest government Advice Against Bathing warning is in
                    place for{" "}
                    <Text style={styles.aabHighlight}>
                      {api?.nearestAab.name}
                    </Text>
                    ,{" "}
                    <Text style={styles.aabHighlight}>
                      {api?.nearestAab.distanceKm} km
                    </Text>{" "}
                    away.
                  </Text>
                )}
                <Text style={styles.displayText}>{info.msg}</Text>
                <Text style={styles.displayText}>
                  {info.warnings[Math.floor(Math.random() * 5)]}
                </Text>
                <Text style={styles.displayText}>{info.disclaimer}</Text>
              </>
            ) : (
              <></>
            )}
          </View>
        )}
      </TouchableWithoutFeedback>
    </>
  );
}
