import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [data, setData] = useState("");
  // useEffect(() => {
  //   fetch("http:localhost:3000")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setData(json);
  //     });
  // });

  return (
    <View style={styles.container}>
      <Text>I made an app can you see</Text>
      <ScrollView>
        <Text></Text>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
