import StarRating from "react-native-star-rating";
import { StyleSheet, Text, View } from "react-native";
import { styles } from "../../styles/swimReviewData";
import { colours } from "../../styles/base";
import { useFonts } from "expo-font";
import { Stat } from "../reuse/Stat";

export function SwimRecord({ swim }) {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
  });

  return (
    <View style={changeMe.swimRecord}>
      <View style={changeMe.swimRecord__text}>
        <Text style={changeMe.swimRecord__name}>{swim.location.name}</Text>
        <Text style={changeMe.swimRecord__date}>
          {new Date(swim.date).toDateString()}
        </Text>
      </View>
      <View style={changeMe.swimRecord__stats}>
        <View style={styles.starRatingDisplay}>
          <StarRating
            disabled={true}
            maxStars={5}
            starSize={18}
            rating={swim.stars}
            fullStarColor="#FFC033"
            emptyStarColor="#DBDBDB"
          />
          <Stat val={swim.feelTemp} icon={"feelTemp"} />
          <Stat val={swim.bankAngle} icon={"bankAngle"} />
          <Stat val={swim.clarity} icon={"clarity"} />
          <Stat val={swim.recordTemp} icon={"recordTemp"} />
          <Stat val={swim.shore} icon={"shore"} />
          <Stat val={swim.sizeKey} icon={"sizeKey"} />
        </View>
      </View>
    </View>
  );
}

const changeMe = StyleSheet.create({
  swimRecord: {
    margin: 12,
    marginTop: 6,
    marginBottom: 6,
    backgroundColor: colours.accent2Weak,
    padding: 8,
    paddingTop: 4,
    borderRadius: 8,
  },
  swimRecord__text: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "top",
  },
  swimRecord__name: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  swimRecord__date: {
    fontSize: 12,
    fontFamily: "Poppins-Light",
  },
});
