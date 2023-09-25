import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

import { colours } from "../styles/base";
import NavBar from "./NavBar";
import { tokenRefresh } from "../firebaseConfig";
import { BACKEND_API_URL, DEFAULT_IMAGE_URL } from "@env";
import { useState, useEffect } from "react";
import { formatDate } from "../extentions";
import SwimFilter from "./Profile/SwimFilter";
import {
  addMonthToSwims,
  coldest,
  favouriteSwim,
  hottest,
  swimTheLakeDistrict,
  swimsThisMonth,
} from "../scripts/swims";
import StarRating from "react-native-star-rating";
import SwimGrid from "./Profile/SwimGrid";
import { SwimRecord } from "./Profile/SwimRecord";
import { useFonts } from "expo-font";

export default Profile = ({ navigation, route }) => {
  const [profileData, setProfileData] = useState({ swims: [] });
  const [swims, setSwims] = useState([]);
  const [filtSwims, setFiltSwims] = useState([]);
  const refreshToken = route.params.refresh_token;
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Regular_Italic": require("../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
  });

  async function getProfile() {
    const tokenObj = await tokenRefresh(refreshToken);
    const url = BACKEND_API_URL + "/users/profile";

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenObj.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        json.dob = formatDate(json.dob.split("T")[0], "-");
        setProfileData(() => json);
        setSwims(() => addMonthToSwims(json.swims));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    const { routes } = navigation.getState();
    const filteredRoutes = routes.filter(
      (route) => route.name !== "Register" && route.name !== "SignIn"
    );
    navigation.reset({
      index: filteredRoutes.length - 1,
      routes: filteredRoutes,
    });
  }, []);

  if (!swims.length) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.app}>
      <NavBar navigation={navigation} />
      <View style={styles.profile}>
        <View style={styles.profile__text}>
          <Text style={styles.profile__name}>{profileData.name}</Text>
          <Text style={styles.profile__nickname}>{profileData.nickname}</Text>
          <Text style={styles.profile__home}>{profileData.home || ""}</Text>
          <Text style={styles.profile__bio}>{profileData.bio || ""}</Text>
        </View>
        {profileData.profileImg ? (
          <Image
            style={styles.profile__img}
            resizeMode={"cover"}
            source={{
              uri: profileData.profileImg,
            }}
          />
        ) : (
          <Image
            style={styles.profileImg}
            source={{ uri: DEFAULT_IMAGE_URL }}
          />
        )}
      </View>
      <View style={styles.stats}>
        <View style={styles.stats__left}>
          <Text style={styles.stats__label}>
            <Text style={styles.stats__stat}>{swims.length}</Text> swims total
          </Text>
          <Text style={styles.stats__label}>
            <Text style={styles.stats__stat}>{swimsThisMonth(swims)}</Text>{" "}
            swims this month
          </Text>
          <Text style={styles.stats__label}>
            Last swam on{" "}
            <Text style={styles.stats__stat}>
              {new Date(swims[0].date)
                .toDateString()
                .split(" ")
                .slice(1, 3)
                .join(" ")}
            </Text>
          </Text>
        </View>
        <View style={styles.stats__right}>
          <Text style={styles.stats__label}>
            Loves <Text style={styles.stats__stat}>{favouriteSwim(swims)}</Text>
          </Text>
          <Text style={styles.stats__label}>
            Swim the Lake District:{" "}
            <Text style={styles.stats__stat}>{swimTheLakeDistrict(swims)}</Text>
          </Text>
        </View>
        <View style={styles.stats__bottom}>
          {coldest(swims) && (
            <Text style={styles.stats__label}>
              Coldest: <Text style={styles.stats__stat}>{coldest(swims)}</Text>,
            </Text>
          )}
          {hottest(swims) && (
            <Text>
              Warmest: <Text style={styles.stats__stat}>{hottest(swims)}</Text>
            </Text>
          )}
        </View>
      </View>
      <SwimFilter
        allSwims={swims}
        filtSwims={filtSwims}
        setFiltSwims={setFiltSwims}
      />
      <SwimGrid />
      <View>
        {filtSwims.map((swim) => {
          return <SwimRecord swim={swim} key={swim._id} />;
        })}
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
  profile: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: 12,
  },
  profile__text: {
    minWidth: 0,
    width: "60%",
    margin: 2,
    padding: 0,
  },
  profile__name: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: colours.text,
    height: 28,
  },
  profile__nickname: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: colours.lightText,
  },
  profile__home: {
    fontSize: 12,
    fontFamily: "Poppins-Light",
    color: colours.lightText,
  },
  profile__bio: {
    fontSize: 16,
    marginTop: 8,
    fontFamily: "Poppins-Regular_Italic",
  },
  profile__img: {
    minWidth: 0,
    width: "38%",
    height: "auto",
    overflow: "hidden",
    borderRadius: 12,
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: colours.accent3Weak,
    padding: 12,
    rowGap: 12,
  },
  stats__left: {
    width: "48%",
    minWidth: 0,
  },
  stats__right: {
    width: "48%",
    minWidth: 0,
    textAlign: "right",
  },
  stats__label: {
    fontFamily: "Poppins-Light",
  },
  stats__stat: {
    fontFamily: "Poppins-Bold",
  },
});
