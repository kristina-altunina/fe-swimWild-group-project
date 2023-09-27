import { StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Image } from "react-native";
import NavBar from "./NavBar";
import PaginationDot from "react-native-animated-pagination-dot";
import { useState } from "react";
import StarRating from "react-native-star-rating";
import { colours } from "../styles/base";
import { useFonts } from "expo-font";
import { Stats } from "./reuse/Stats";

export default function SwimSpot({
  navigation,
  route: {
    params: { swim },
  },
}) {
  const [curImagePage, setCurImagePage] = useState(0);
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Regular_Italic": require("../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Bold_Italic": require("../assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
  });

  function StarRatingDisplay({ num }) {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 3,
          marginBottom: 3,
        }}
      >
        <StarRating
          disabled={true}
          maxStars={5}
          starSize={18}
          rating={swim.stars}
          fullStarColor="#FFC033"
          emptyStarColor="#DBDBDB"
        />
      </View>
    );
  }

  function handleSelectedPage(e) {
    setCurImagePage((curImagePage) => e.nativeEvent?.position);
  }

  return (
    <View style={{ flex: 1 }}>
      <NavBar navigation={navigation} />
      <View
        style={{
          width: "100%",
          height: "50%",
          padding: 12,
          display: "flex",
          alignItems: "center",
        }}
      >
        <PagerView
          style={{ width: "100%", height: "100%" }}
          initialPage={0}
          scrollEnabled={true}
          orientation="horizontal"
          onPageSelected={(e) => handleSelectedPage(e)}
        >
          {swim.imgUrls.map((picture, i) => {
            return (
              <View key={i} collapsable={false}>
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: picture }}
                  collapsable={false}
                />
              </View>
            );
          })}
        </PagerView>
        <PaginationDot
          activeDotColor={colours.text}
          curPage={curImagePage}
          maxPage={swim.imgUrls.length}
        />
      </View>
      <View style={styles.text}>
        <Text style={styles.location}>{swim.location.name}</Text>
        <View style={styles.headerStat}>
          <Text style={styles.subtitle}>{swim.nickname}</Text>
          <Text style={styles.date}>{new Date(swim.date).toDateString()}</Text>
        </View>
        <StarRatingDisplay num={swim.stars} />
        <Text style={styles.body}>{swim.notes}</Text>
        <View style={styles.divider}>
          <Stats data={swim} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 12,
  },
  location: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    width: "80%",
    minWidth: 0,
    height: 25,
    color: colours.text,
  },
  headerStat: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontFamily: "Poppins-Regular",
    color: colours.lightText,
    fontSize: 14,
  },
  subtitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: colours.accent1,
  },
  body: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: colours.text,
  },
  divider: {
    borderTopStyle: "solid",
    borderTopColor: colours.accent3Weak,
    borderTopWidth: 1,
    height: 40,
    marginTop: 10,
    paddingTop: 10,
  },
});
