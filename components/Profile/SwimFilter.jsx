import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { colours } from "../../styles/base";
import { listLocations } from "../../scripts/swims";
import { useFonts } from "expo-font";

export default function SwimFilter({ allSwims, filtSwims, setFiltSwims }) {
  const [locationSwims, setLocationSwims] = useState(allSwims);
  const [dateValue, setDateValue] = useState(null);
  const [dateDropdownData, setDateDropdownData] = useState([]);
  const [locationValue, setLocationValue] = useState(null);
  const [locationDropdownData, setLocationDropdownData] = useState([]);
  const [sortByValue, setSortByValue] = useState(null);
  const [fontsLoaded] = useFonts({
    "Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
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
      locations.unshift("All");
      return locations.map((val) => {
        return { label: val, value: val };
      });
    });
  }, [allSwims]);

  function sortBy(swims, field = sortByValue) {
    const newSwims = [...swims];
    newSwims.sort((a, b) => {
      if (field === "date") {
        return a[field] < b[field] ? 1 : -1;
      } else {
        return +b[field] - +a[field];
      }
    });
    return newSwims;
  }

  return (
    <View style={styles.container}>
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
          setFiltSwims(() => {
            return sortBy(
              locationSwims.filter((swim) => {
                if (item.value === "All") return swim;
                return swim.dateKey === item.value;
              })
            );
          });
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
          setLocationSwims(() => {
            if (item.value === "All") {
              setLocationSwims(() => allSwims);
              setFiltSwims(() => {
                return sortBy(
                  allSwims.filter((swim) => {
                    if (dateValue === "All") return swim;
                    return swim.dateKey === dateValue;
                  })
                );
              });
            } else {
              const newSwims = allSwims.filter((swim) => {
                return swim.location.name === item.value;
              });
              setLocationSwims(() => newSwims);
              setFiltSwims(() => sortBy(newSwims));
            }
          });
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
          setFiltSwims((swims) => sortBy(swims, item.value));
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
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: colours.text,
  },
  placeholderStyle: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: colours.text,
  },
  selectedTextStyle: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: colours.text,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    fontFamily: "Poppins-Light",
  },
});
