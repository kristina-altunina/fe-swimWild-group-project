import { StyleSheet } from "react-native";
import { colours } from "./base";

export const styles = StyleSheet.create({
  textWithInfoContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  infoData: {
    padding: 12,
    backgroundColor: "white",
    borderRadius: 20,
    margin: 4,
    marginTop: 0,
    backgroundColor: colours.accent2,
    display: "flex",
    gap: 10,
  },
  titleText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Poppins-Bold",
    height: 30,
  },
  displayText: {
    color: "white",
    fontFamily: "Poppins-Regular",
  },
  hazardText: {
    color: colours.text,
    fontFamily: "Poppins-Bold",
    width: "90%",
  },
});
