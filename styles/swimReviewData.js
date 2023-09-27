import { StyleSheet } from "react-native";
import { colours } from "./base";

export const styles = StyleSheet.create({
  swimReviewGroup: {
    padding: "2%",
    display: "flex",
    gap: 10,
  },
  titleText: {
    fontSize: 20,
    color: "#84878d",
    fontFamily: "Poppins-SemiBold",
  },
  starRatingDisplay: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
    marginBottom: 2,
  },
  swimReviewItem: {
    padding: 8,
    backgroundColor: colours.accent2Weak,
    height: "auto",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    width: "auto",
  },
  swimReviewItem__header: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  textContainer: {
    flex: 1,
  },
  nickname: {},
  notes: {
    padding: 8,
    fontFamily: "Poppins-Regular",
  },
  stars: {},
  showContent: {
    color: colours.blueAccent,
    fontFamily: "Poppins-SemiBold",
  },
  hideContent: {
    opacity: 0,
    height: 0,
  },
  profileImage: {
    objectFit: "contain",
    height: 60,
    width: 60,
    borderRadius: 30,
    margin: 8,
    marginRight: 12,
    marginBottom: 0,
    backgroundColor: "black",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nickname: {
    fontFamily: "Poppins-Bold",
    color: colours.text,
  },
  date: {
    fontFamily: "Poppins-Light",
    marginRight: 8,
  },
});

export const props = {
  KeyboardAvoidingView: {
    behavior: Platform.OS === "ios" ? "padding" : "height",
    keyboardVerticalOffset: Platform.OS === "ios" ? 0 : -300,
  },
};
