import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { colours } from "../../styles/base";
import { listLocations } from "../../scripts/swims";
import { useFonts } from "expo-font";

export default function SwimFilter({ allSwims, filtSwims, setFiltSwims }) {
  const [dateValue, setDateValue] = useState(null);
  const [dateDropdownData, setDateDropdownData] = useState([]);
  const [locationValue, setLocationValue] = useState(null);
  const [locationDropdownData, setLocationDropdownData] = useState([]);
  const [sortByValue, setSortByValue] = useState(null);
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Regular_Italic": require("../../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
  });

  const sortByDropdownData = [
    { label: "Date", value: "date" },
    { label: "Stars", value: "stars" },
    { label: "Temp", value: "recordTemp" },
    { label: "Mins", value: "mins" },
    { label: "Km", value: "km" },
  ];

  useEffect(() => {
    setDateDropdownData(() => {
      const dates = allSwims
        .map((swim) => swim.dateKey)
        .filter((item, i, arr) => arr.indexOf(item) === i);
      dates.unshift("All");
      return dates.map((val) => {
        return { label: val, value: val };
      });
    });
    setLocationDropdownData(() => {
      const locations = listLocations(allSwims);
      return locations.map((val) => {
        return { label: val, value: val };
      });
    });
  }, [allSwims]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.filter__label}>Date: </Text> */}
      <Dropdown
        style={[styles.dropdown, { width: "25%" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        search
        data={dateDropdownData}
        maxHeight={400}
        value={dateValue}
        labelField="label"
        valueField="value"
        placeholder={"Date"}
        searchPlaceholder="Search..."
        itemTextStyle={styles.dropdownText}
        onChange={(item) => {
          setDateValue(item.value);
          setFiltSwims(
            allSwims.filter((swim) => {
              if (item.value === "All") return swim;
              return swim.dateKey === item.value;
            })
          );
        }}
      />
      <Dropdown
        style={[styles.dropdown, { width: "45%" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        search
        data={locationDropdownData}
        maxHeight={400}
        value={locationValue}
        labelField="label"
        valueField="value"
        placeholder={"Location"}
        searchPlaceholder="Search..."
        itemTextStyle={styles.dropdownText}
        onChange={(item) => {
          setLocationValue(item.value);
          setFiltSwims(
            allSwims.filter((swim) => {
              if (item.value === "All") return swim;
              return swim.dateKey === item.value;
            })
          );
        }}
      />
      <Dropdown
        style={[styles.dropdown, { width: "25%" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={sortByDropdownData}
        maxHeight={400}
        value={sortByValue}
        labelField="label"
        valueField="value"
        placeholder={"Sort"}
        searchPlaceholder="Search..."
        itemTextStyle={styles.dropdownText}
        onChange={(item) => {
          setSortByValue(item.value);
          setFiltSwims(() => {
            const newSwims = [...allSwims];
            newSwims.sort((a, b) => {
              return +b[item.value] - +a[item.value];
            });
            return newSwims;
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colours.accent2,
    margin: 12,
    borderRadius: 12,
    height: 60,
    padding: 10,
  },
  dropdown: {
    height: 40,
    margin: 0,
    borderRadius: 8,
    backgroundColor: colours.bg,
    paddingHorizontal: 8,
    width: "30%",
    marginRight: "2.5%",
  },
  dropdownText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  label: {
    position: "absolute",
    backgroundColor: colours.accent4,
    borderRadius: 8,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    fontFamily: "Poppins-Light",
  },
});
