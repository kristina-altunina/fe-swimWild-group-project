import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Text, View } from "react-native";

export default function LocationPermission({ onPermissionChange }) {
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    const requestPermission = () => {
      Location.requestForegroundPermissionsAsync()
        .then(({ status }) => {
          setPermission(status);
          onPermissionChange(status === "granted");
        })
        .catch((error) => {
          console.error("Error in requesting permission: ", error);
          onPermissionChange(false);
        });
    };
    requestPermission();
  }, []);

  return <View />;
}
