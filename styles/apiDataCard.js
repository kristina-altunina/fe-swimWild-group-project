import { StyleSheet } from "react-native";
import { colours } from "./base";

export const styles = StyleSheet.create({
  displayText: {
    color: colours.text,
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
  "displayText--highlight": {
    color: colours.accent1,
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
  "displayText--large": {
    fonSize: 16,
    color: colours.lightText,
    fontFamily: "Poppins-Bold",
    height: 25,
  },
  exclamationMarkIcon: {
    height: 100,
    width: 100,
  },
  expandedDataContainer: {
    display: "flex",
    gap: 2,
    padding: "2%",
    opacity: 0.8,
    borderRadius: 20,
    backgroundColor: colours.accent3,
  },
  expandedDataText: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
  },
  expandedDataTextHeading: {
    color: colours.text,
    fontFamily: "Poppins-SemiBold",
  },
  expandedDataTextHighlight: {
    color: colours.accent5,
    fontFamily: "Poppins-SemiBold",
  },
  expandedDataTidesText: {
    color: "white",
    marginLeft: "15%",
  },
  forecastDatesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    color: "white",
    padding: "1%",
    gap: 15,
  },
  hideContent: {
    opacity: 0,
    height: 0,
  },
  highlightText: {
    color: colours.lightText,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
  },
  popupContainer: {
    display: "flex",
    flexBasis: "auto",
    width: "60%",
    backgroundColor: colours.accent2,
    alignItems: "center",
    padding: "5%",
    borderRadius: 20,
    gap: 10,
    marginTop: "50%",
  },
  popupContainerSetup: {
    display: "flex",
    flex: 1,
    backgroundColor: "rgba(225, 225, 225, 0.8)",
    alignItems: "center",
  },
  popupTitle: {
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
  popupDetails: {
    color: "white",
    fontFamily: "Poppins-Regular",
  },
  selectedForecastDate: {
    paddingRight: 20,
    color: colours.text,
    fontFamily: "Poppins-Bold",
  },
  forecastDates: {
    paddingRight: 6,
    color: colours.lightText,
    fontFamily: "Poppins-SemiBold",
  },
  swimBot: {
    padding: 12,
    margin: 4,
    marginTop: 0,
    backgroundColor: colours.accent4,
    borderRadius: 20,
    display: "flex",
    gap: 2,
  },
  showContent: {
    opacity: 1,
  },
  textWithInfoContainerCentered: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "flex-start",
    alignItems: "baseline",
  },
  textWithInfoContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    color: colours.accent1,
    fontFamily: "Poppins-Bold",
  },
});
