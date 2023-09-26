import React, { useState, useCallback } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { debounce } from "lodash";

export default function LocationSearch({ setUserLocation }) {
  const [inputValue, setInputValue] = useState("");

  const fetchGeocode = (text) => {
    const apiKey = "AIzaSyB9lp6ylbRyXKynILcL29iLUUrUAQwM5aI";
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        text
      )}&key=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          console.log("SEARCH_NEW_REGION: ", location);
          setUserLocation({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922 * 2,
            longitudeDelta: 0.0421 * 2,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching geocoding results:", error);
      });
  };

  const debouncedFetchGeocode = useCallback(debounce(fetchGeocode, 1000), []);

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Search for a location..."
        value={inputValue}
        onChangeText={(text) => {
          setInputValue(text);
          if (text.trim()) {
            debouncedFetchGeocode(text);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
});
