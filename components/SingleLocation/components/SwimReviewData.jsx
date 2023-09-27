import { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  LayoutAnimation,
  ActivityIndicator,
} from "react-native";
import { styles } from "../../../styles/swimReviewData";
import StarRating from "react-native-star-rating";
import { useFonts } from "expo-font";

export default function SwimReviewData({ swimsData, navigation }) {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../../../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Regular_Italic": require("../../../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../../../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Light": require("../../../assets/fonts/Poppins-Light.ttf"),
  });

  function handleExpandSwimReview(swim) {
    return navigation.navigate("SwimSpot", { swim });
  }

  function StarRatingDisplay({ num }) {
    return (
      <View style={styles.starRatingDisplay}>
        <StarRating
          disabled={true}
          maxStars={5}
          starSize={18}
          rating={4}
          fullStarColor="#FFC033"
          emptyStarColor="#DBDBDB"
        />
      </View>
    );
  }

  return (
    <>
      <View style={styles.swimReviewGroup}>
        <Text style={styles.titleText}>Latest Reviews</Text>
        {!Object.keys(swimsData).length ? (
          <ActivityIndicator size="large" />
        ) : (
          swimsData.map((swim, i) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  handleExpandSwimReview(swim);
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                }}
                key={i}
              >
                <View style={styles.swimReviewItem}>
                  <View style={styles.swimReviewItem__header}>
                    <Image
                      style={styles.profileImage}
                      source={{ uri: swim.profileImg }}
                    />
                    <View style={styles.textContainer}>
                      <View style={styles.flexRow}>
                        <Text style={styles.nickname}>{swim.nickname}</Text>
                        <Text style={styles.date}>
                          {new Date(swimsData[0]?.date)?.toDateString()}
                        </Text>
                      </View>
                      <View>
                        <StarRatingDisplay num={swim.stars} />
                      </View>
                      <Text style={styles.showContent}>See review</Text>
                    </View>
                  </View>
                  <Text style={styles.notes}>{swim.notes}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })
        )}
      </View>
    </>
  );
}
