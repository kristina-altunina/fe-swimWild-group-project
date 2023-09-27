import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { colours } from "../../styles/base";

export default function GoogleMapComponent({
  onRegionChange,
  locations,
  region,
  navigation,
  showNewLocation,
  newLocation,
  setNewLocation,
}) {
  function handleClick(id) {
    return navigation.navigate("SingleLocation", { id });
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
                <Text>
                  {location.name} - {location.type}
                </Text>
                <Text>Stars: {location.avStars}</Text>
                <Text>Distance: {location.distanceKm} km</Text>
              </TouchableOpacity>
            </Callout>
          </Marker>
        ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {},
});
