import { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  LayoutAnimation,
  ActivityIndicator,
} from "react-native";
import { styles } from "../../../styles/userDataCard";
import StarRating from "react-native-star-rating";
import { useFonts } from "expo-font";
import { Stat } from "../../reuse/Stat";
import { capitalise } from "../SingleLocation";

export default function UserDataCard({ userData }) {
  const [expandUserData, setExpandUserData] = useState(false);
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

  function handleExpandUserData() {
    setExpandUserData((expandUserData) => !expandUserData);
  }

  function StarRatingDisplay({ num }) {
    return (
      <View style={styles.starRatingDisplay}>
        <Text style={styles.stat__label}>Average Rating </Text>
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

  function stringifyReview(data) {
    let output = "";
    for (const key in data) {
      output += capitalise(key);
      output += `:  ${data[key]}  •  `;
    }
    return output.slice(0, -5) || null;
  }

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          handleExpandUserData();
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }}
      >
        {!Object.keys(userData).length ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={styles.AveUserData}>
            <Text style={styles.titleText}>User Verdict</Text>
            {!expandUserData ? (
              <>
                <StarRatingDisplay num={userData.avStars} />
                {userData.mostRecentTemp !== null && (
                  <Text style={styles.displayText}>
                    <Text style={styles.stat__label}>
                      Latest recorded temp:{"  "}
                    </Text>
                    <Text style={styles.stat__highlight}>
                      {userData.mostRecentTemp.temp}°C{"  "}
                    </Text>
                    <Text style={styles.stat__extra}>
                      ({new Date(userData.mostRecentTemp.date).toDateString()})
                    </Text>
                  </Text>
                )}
                <Text
                  style={
                    expandUserData ? styles.hideContent : styles.showContent
                  }
                >
                  See more...
                </Text>
              </>
            ) : (
              <>
                <View style={styles.expandedData}>
                  <StarRatingDisplay num={userData.avStars} />
                  {userData.mostRecentTemp !== null && (
                    <Text style={styles.displayText}>
                      <Text style={styles.stat__label}>
                        Latest recorded temp:{"  "}
                      </Text>
                      <Text style={styles.stat__highlight}>
                        {userData.mostRecentTemp.temp}°C{"  "}
                      </Text>
                      <Text style={styles.stat__extra}>
                        ({new Date(userData.mostRecentTemp.date).toDateString()}
                        )
                      </Text>
                    </Text>
                  )}
                  <Stat icon="outOfDepth" val={userData.outOfDepth} big />
                  <Stat icon="mins" val={userData.avMins} big />
                  <Stat
                    icon="feelTemp"
                    val={stringifyReview(userData.feelTemps)}
                    big
                  />
                  <Stat
                    icon="sizeKey"
                    val={stringifyReview(userData.sizes)}
                    big
                  />
                  <Stat
                    icon="shore"
                    val={stringifyReview(userData.shores)}
                    big
                  />
                  <Stat
                    icon="bankAngle"
                    val={stringifyReview(userData.bankAngles)}
                    big
                  />
                  <Stat
                    icon="clarity"
                    val={stringifyReview(userData.clarities)}
                    big
                  />
                </View>
              </>
            )}
          </View>
        )}
      </TouchableWithoutFeedback>
    </>
  );
}
