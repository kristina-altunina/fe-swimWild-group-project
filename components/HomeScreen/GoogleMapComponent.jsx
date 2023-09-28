import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { colours } from "../../styles/base";
import { useFonts } from "expo-font";
import StarRating from "react-native-star-rating";

export default function GoogleMapComponent({
  onRegionChange,
  locations,
  region,
  navigation,
  showNewLocation,
  newLocation,
  setNewLocation,
}) {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  function handleClick(id) {
    return navigation.navigate("SingleLocation", { uid: id });
  }
  return (
    <MapView
      style={{ width: "100%", height: "100%", padding: 100 }}
      onRegionChangeComplete={onRegionChange}
      region={region}
    >
      {showNewLocation && (
        <Marker
          key={"newLocation"}
          tracksViewChanges={false}
          draggable
          coordinate={{
            latitude: newLocation.latitude,
            longitude: newLocation.longitude,
          }}
          title={"Post new swim location here?"}
          pinColor={colours.accent1}
          onDragEnd={(e) => {
            console.log("the coordinate", e.nativeEvent.coordinate);
            setNewLocation({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
          description="Press and hold to drag."
        ></Marker>
      )}
      {locations &&
        locations.map((location) => (
          <Marker
            tracksViewChanges={false}
            key={location._id}
            coordinate={{
              latitude: location.coords[0],
              longitude: location.coords[1],
            }}
            title={location.name}
            description={location.type}
          >
            <Callout onPress={() => handleClick(location._id)}>
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.text}>
                  {location.name} - {location.type}
                </Text>
                <View style={styles.starRatingDisplay}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    starSize={18}
                    rating={location.avStars}
                    fullStarColor="#FFC033"
                    emptyStarColor="#DBDBDB"
                  />
                </View>
                <Text style={styles.distance}>{location.distanceKm} km</Text>
              </TouchableOpacity>
            </Callout>
          </Marker>
        ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {},
  text: {
    fontFamily: "Poppins-Regular",
    color: colours.text,
  },
  starRatingDisplay: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
    marginBottom: 2,
  },
  distance: {
    color: colours.accent1,
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
});
