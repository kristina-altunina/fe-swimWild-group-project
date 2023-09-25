import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import LocationSearch from "./LocationSearch";
import GoogleMapComponent from "./GoogleMapComponent";
import LocationPermission from "./LocationPermission";
import NavBar from "./NavBar";
import { getAllLocations } from "../scripts/axios";

export default function HomeScreen({ navigation }) {
  const [noLocationsFound, setNoLocationsFound] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 54.636,
    longitude: -3.3631,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });
  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(true);

  useEffect(() => {
    setLoadingLocations(true);
    getAllLocations([userLocation.latitude, userLocation.longitude, 1000]).then(
      (data) => {
        setLocations((locations) => [...data]);
        setLoadingLocations(false);
      }
    );
  }, [userLocation]);

  const handlePermissionChange = (isGranted) => {
    if (isGranted) {
      // set user location to device location
      Location.getCurrentPositionAsync({}).then(({ coords }) => {
        const { latitude, longitude } = coords;
        setUserLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0922 * 2,
          longitudeDelta: 0.0421 * 2,
        });
      });
    }
  };

  const handleRegionChange = (newRegion) => {
    setUserLocation(newRegion);
  };

  function handleClick(uid) {
    console.log(uid);
    // return (
    // 	<SingleLocation uid={uid} />
    // 	{

    // 	}
    // )
    return navigation.navigate("SingleLocation", { uid });
  }

  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />
      <LocationPermission onPermissionChange={handlePermissionChange} />
      <LocationSearch setUserLocation={setUserLocation} />
      <GoogleMapComponent
        region={userLocation}
        onRegionChange={handleRegionChange}
      >
        {(locations || []).map((location) => (
          <Marker
            key={location._id}
            coordinate={{
              latitude: location.coords[0],
              longitude: location.coords[1],
            }}
            title={location.name}
            description={location.type}
          />
        ))}
      </GoogleMapComponent>
      {loadingLocations ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          {locations.map((location) => {
            return (
              <TouchableOpacity onPress={() => handleClick(location._id)}>
                <Text style={{ fontSize: 20 }}>{location.name}</Text>
              </TouchableOpacity>
            );
          })}
        </>
      )}

      {/* {noLocationsFound && <Text style={styles.noLocationsText}>No locations found nearby!</Text>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "fff",
  },
  listItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  listItemText: {
    fontSize: 18,
  },
  listItemDescription: {
    fontSize: 14,
    color: "gray",
  },
  noLocationsText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  },
});
