import { StyleSheet } from "react-native";
import { colours } from "./base";

export const styles = StyleSheet.create({
  AveUserData: {
    padding: 12,
    margin: 4,
    marginTop: 0,
    backgroundColor: "white",
    borderRadius: 20,
    backgroundColor: colours.accent5,
    display: "flex",
    gap: 2,
  },
  titleText: {
    fontSize: 20,
    color: colours.accent1,
    fontFamily: "Poppins-Bold",
  },
  displayText: {
    color: colours.text,
    fontFamily: "Poppins-Regular",
  },
  stat__label: {
    color: colours.text,
    fontFamily: "Poppins-Bold",
  },
  stat__extra: {
    color: colours.accent1,
    fontFamily: "Poppins-Regular",
  },
  stat__highlight: {
    color: colours.accent1,
    fontFamily: "Poppins-Bold",
  },
  expandedData: {
    display: "flex",
    gap: 2,
  },
  showContent: {
    color: colours.lightText,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    opacity: 1,
  },
  hideContent: {
    opacity: 0,
    height: 0,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  starRatingDisplay: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
  },
  marginLeft: {
    color: "white",
    marginLeft: "5%",
  },
});

export const props = {
  KeyboardAvoidingView: {
    behavior: Platform.OS === "ios" ? "padding" : "height",
    keyboardVerticalOffset: Platform.OS === "ios" ? 0 : -300,
  },
};
