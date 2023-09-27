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
  notes: {
    padding: 8,
    fontFamily: "Poppins-Regular",
  },
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
  empty: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: colours.accent2,
  },
  swimRecord: {
    margin: 12,
    marginTop: 6,
    marginBottom: 6,
    backgroundColor: colours.accent2Weak,
    padding: 8,
    paddingTop: 4,
    borderRadius: 8,
  },
  swimRecord__text: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "top",
    width: "100%",
  },
  swimRecord__name: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: colours.text,
    width: "70%",
  },
  swimRecord__date: {
    fontSize: 12,
    fontFamily: "Poppins-Light",
    color: colours.text,
  },
});

export const props = {
  KeyboardAvoidingView: {
    behavior: Platform.OS === "ios" ? "padding" : "height",
    keyboardVerticalOffset: Platform.OS === "ios" ? 0 : -300,
  },
};
