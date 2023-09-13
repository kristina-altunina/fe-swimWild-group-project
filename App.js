import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [data, setData] = useState({ articles: [{ author: "" }] });
  useEffect(() => {
    fetch("https://articles-api-zepx.onrender.com/api/articles")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  });

  return (
    <View style={styles.container}>
      <Text>I made an app can you see {data.articles[0].author}</Text>
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

//hello
