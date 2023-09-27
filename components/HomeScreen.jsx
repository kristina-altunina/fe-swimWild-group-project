import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

import * as Location from "expo-location";
import LocationSearch from "./HomeScreen/LocationSearch";
import GoogleMapComponent from "./HomeScreen/GoogleMapComponent";
import LocationPermission from "./HomeScreen/LocationPermission";
import NavBar from "./NavBar";
import { getAllLocations, postSwimLocation } from "../scripts/axios";
import { LocationPreview } from "./HomeScreen/LocationPreview";
import { useFonts } from "expo-font";
import { colours } from "../styles/base";
import { Dropdown } from "react-native-element-dropdown";
import { useSelector } from "react-redux";
import { tokenRefresh } from "../firebaseConfig";

export default function HomeScreen({ navigation }) {
  const [noLocationsFound, setNoLocationsFound] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 54.636,
    longitude: -3.3631,
    latitudeDelta: 0.0922 * 2,
    longitudeDelta: 0.0421 * 2,
  });
  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [showNewLocation, setShowNewLocation] = useState(false);
  const [newLocation, setNewLocation] = useState({
    latitude: 54.636,
    longitude: -3.3631,
  });
  const [type, setType] = useState(null);
  const [name, setName] = useState(null);
  const [postingLocation, setPostingLocation] = useState(false);
  const [tooClose, setTooClose] = useState(false);
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Bold_Italic": require("../assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
  });
  const refreshToken = useSelector((state) => state.refresh_token);

  useEffect(() => {
    console.log(userLocation);
    setLoadingLocations(true);
    getAllLocations(
      [userLocation.latitude, userLocation.longitude],
      8 + Math.floor(10 * userLocation.latitudeDelta)
    ).then((data) => {
      setLocations(() => [...data]);
      setLoadingLocations(false);
    });
  }, []);

  const handlePermissionChange = (isGranted) => {
    if (isGranted) {
      Location.getCurrentPositionAsync({}).then(({ coords }) => {
        const { latitude, longitude } = coords;
        setUserLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0922 * 2,
          longitudeDelta: 0.0421 * 2,
        });
        setNewLocation({
          latitude,
          longitude,
        });
      });
    }
  };

  function handleClick(uid) {
    return navigation.navigate("SingleLocation", { uid });
  }

  function handleRegionChange({ latitude, longitude, latitudeDelta }) {
    console.log(newLocation);
    if (loadingLocations) return;
    setLoadingLocations(() => true);
    setNewLocation({
      latitude,
      longitude,
    });
    getAllLocations(
      [latitude, longitude],
      8 + Math.floor(10 * latitudeDelta)
    ).then((data) => {
      setLocations(() => [...data]);

      setLoadingLocations(() => false);
    });
  }

  function showNewLocationMarker() {
    setShowNewLocation((bool) => !bool);
  }

  async function handleSubmit() {
    setPostingLocation(true);
    const body = {
      name,
      type,
      coords: [newLocation.latitude, newLocation.longitude],
    };
    const tokenObj = await tokenRefresh(refreshToken);
    postSwimLocation(tokenObj.access_token, body)
      .then((data) => {
        setPostingLocation(false);
        return navigation.navigate("SingleLocation", { uid: data._id });
      })
      .catch((response) => {
        setPostingLocation(false);
        setTooClose(true);
        setTimeout(() => {
          setTooClose(false);
        }, 2000);
      });
  }

  if (!fontsLoaded) {
    return <ActivityIndicator></ActivityIndicator>;
  }

  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />
      <LocationPermission onPermissionChange={handlePermissionChange} />
      <View style={styles.mapContainer}>
        <GoogleMapComponent
          region={userLocation}
          onRegionChange={handleRegionChange}
          locations={locations}
          navigation={navigation}
          showNewLocation={showNewLocation}
          newLocation={newLocation}
          setNewLocation={setNewLocation}
        />
        <TouchableOpacity
          style={styles.postSwim}
          onPress={showNewLocationMarker}
        >
          <Text style={styles.postSwim__text}>
            {showNewLocation ? `Hide new swim spot` : `Post a new swim spot!`}
          </Text>
        </TouchableOpacity>
        <View style={styles.locationSearch}>
          <LocationSearch
            style={styles.locationSearch}
            setUserLocation={setUserLocation}
          />
        </View>
      </View>

      <View style={styles.locationList}>
        {showNewLocation ? (
          postingLocation ? (
            <ActivityIndicator></ActivityIndicator>
          ) : tooClose ? (
            <Text style={styles.form__error}>
              This is too close to an existing location - sorry!
            </Text>
          ) : (
            <View style={styles.form}>
              <Text style={styles.form__title}>Post a new swim-spot</Text>
              <Text style={styles.form__label}>Name</Text>
              <TextInput
                style={styles.form__textInput}
                value={name}
                onChangeText={setName}
                maxLength={30}
              />
              <Text style={styles.form__label}>Type</Text>
              <Dropdown
                style={styles.form__dropdown}
                placeholderStyle={styles.form__dropdownPlaceholder}
                itemTextStyle={styles.form__dropdownItem}
                selectedTextStyle={styles.form__dropdownSelected}
                data={[
                  { label: "Lake", value: "lake" },
                  { label: "River", value: "river" },
                  { label: "Sea", value: "sea" },
                  { label: "Pond", value: "pond" },
                ]}
                maxHeight={300}
                value={type}
                labelField="label"
                valueField="value"
                placeholder="Lake/River/Sea etc."
                onChange={(item) => {
                  setType(item.value);
                }}
              />
              <TouchableOpacity
                style={styles.form__submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.form__submit}>Post Location</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <ScrollView>
            {locations &&
              locations.map((location) => (
                <TouchableOpacity
                  onPress={() => handleClick(location._id)}
                  key={location._id}
                >
                  <LocationPreview
                    key={location._id}
                    name={location.name}
                    type={location.type}
                    distance={location.distanceKm.toFixed(2)}
                    avStars={location.avStars}
                  />
                </TouchableOpacity>
              ))}
          </ScrollView>
        )}
      </View>
      {/* {noLocationsFound && <Text style={styles.noLocationsText}>No locations found nearby!</Text>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff",
  },
  noLocationsText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  },
  mapContainer: {
    flex: 3,
    marginBottom: 4,
  },
  locationSearch: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
    width: "100%",
  },
  locationList: {
    flex: 2,
  },
  postSwim: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 5,
    width: 100,
    backgroundColor: colours.accent5,
    margin: 8,
    borderRadius: 12,
  },
  postSwim__text: {
    fontFamily: "Poppins-SemiBold",
    color: colours.text,
    textAlign: "center",
  },
  form: {
    backgroundColor: colours.accent2Weak,
    margin: 8,
    borderRadius: 12,
    padding: 12,
  },
  form__title: {
    fontFamily: "Poppins-Bold",
    color: colours.text,
    fontSize: 18,
  },
  form__label: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: colours.lightText,
  },
  form__textInput: {
    backgroundColor: "white",
    height: 30,
    width: "100%",
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 8,
  },
  form__dropdown: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingLeft: 8,
    marginTop: 2,
    marginBottom: 10,
  },
  form__dropdownPlaceholder: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    paddingTop: 4,
    color: colours.text,
  },
  form__dropdownItem: {
    fontFamily: "Poppins-Light",
    fontSize: 14,
    height: 20,
    padding: 0,
    margin: 0,
  },
  form__dropdownSelected: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    paddingTop: 4,
    color: colours.text,
  },
  form__submit: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    padding: 6,
    color: "white",
    textAlign: "center",
  },
  form__submitButton: {
    backgroundColor: colours.blueAccent,
    width: 140,
    borderRadius: 12,
    marginTop: 10,
  },
  form__error: {
    color: "red",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },
});
