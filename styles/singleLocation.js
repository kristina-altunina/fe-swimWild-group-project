import { StyleSheet } from "react-native";
import { colours } from "./base";

export const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    top: "50%",
    left: "45%",
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  screen: {
    width: "100%",
    height: "auto",
  },
  display: {
    flex: 1,
    display: "flex",
    backgroundColor: colours.bg,
    padding: "1%",
    paddingBottom: 0,
    gap: 10,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: 20,
  },
  title__text: {
    fontSize: 35,
    width: "100%",
    height: 50,
    color: colours.text,
    textAlign: "center",
    fontFamily: "Poppins-ExtraBold",
  },
  title__type: {
    color: colours.lightText,
    fontFamily: "Poppins-Bold",
  },
  title__coords: {
    color: colours.accent1,
    fontFamily: "Poppins-Bold",
  },
  displayText: {
    color: "white",
  },
  summary: {
    padding: "2%",
    backgroundColor: "white",
    borderRadius: 20,
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 1,
    elevation: 10,
  },
  showContent: {
    opacity: 1,
  },
  hideContent: {
    opacity: 0,
    height: 0,
  },
});

export const props = {
  KeyboardAvoidingView: {
    behavior: Platform.OS === "ios" ? "padding" : "height",
    keyboardVerticalOffset: Platform.OS === "ios" ? 0 : -300,
  },
};
