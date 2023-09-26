import { styles } from "../../../styles/apiDataCard";
import { useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  Text,
  View,
  LayoutAnimation,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import { getLocationByID } from "../../../scripts/axios";
import { Dropdown } from "react-native-element-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { colours } from "../../../styles/base";

export default function ApiDataSeaCard({ apiData, uid }) {
  const [showForecast, setShowForecast] = useState(false);
  const [selectedForecastDate, setSelectedForecastDate] = useState("Today");
  const [dataToDisplay, setDataToDisplay] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dayBar, setDayBar] = useState(["Today"]);
  const [siteData, setSiteData] = useState([]);
  const [selectedSite, setSelectedSite] = useState(0);
  const [popupArr, setPopupArr] = useState([]);
  const daysRef = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../../../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Regular_Italic": require("../../../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../../../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Light": require("../../../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../../../assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    setIsLoading((isLoading) => !isLoading);
    !Object.keys(dataToDisplay).length
      ? setDataToDisplay((dataToDisplay) => {
          setIsLoading((isLoading) => !isLoading);
          return apiData;
        })
      : getLocationByID(uid, dayBar.indexOf(selectedForecastDate), selectedSite)
          .then(({ apiData }) => {
            setIsLoading((isLoading) => !isLoading);
            setDataToDisplay((dataToDisplay) => apiData);
          })
          .catch((err) => {
            console.log(err);
          });

    setSiteData((siteData) =>
      apiData.hydrologyData.nearby.map((site, i) => {
        return { value: i, label: site.name };
      })
    );
  }, [selectedForecastDate, setDataToDisplay]);

  useEffect(() => {
    if (dayBar.length !== 7) {
      setDayBar((dayBar) => {
        let currentDay = daysRef.indexOf(
          new Date(apiData.weather.values.datetimeStr)
            .toDateString()
            .split(" ")[0]
        );
        const arr = [];

        while (arr.length !== 6) {
          if (currentDay < 6) {
            currentDay++;
            arr.push(daysRef[currentDay]);
          } else {
            currentDay = 0;
            arr.push(daysRef[currentDay]);
          }
        }

        return [...dayBar, ...arr];
      });
    }
  }, []);

  useEffect(() => {
    setIsLoading((isLoading) => !isLoading);
    getLocationByID(uid, dayBar.indexOf(selectedForecastDate), selectedSite)
      .then(({ apiData }) => {
        setIsLoading((isLoading) => !isLoading);
        setDataToDisplay((dataToDisplay) => apiData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedSite]);

  function handleShowForecast() {
    setShowForecast((showForecast) => !showForecast);
  }

  function handleSelectedForecast(i) {
    setSelectedForecastDate((selectedForecastDate) => {
      return i;
    });
  }

  function handleForecastDateStyle(i) {
    if (i === dayBar.indexOf(selectedForecastDate)) {
      return styles.selectedForecastDate;
    } else {
      return styles.forecastDates;
    }
  }

  if (!Object.keys(dataToDisplay).length) {
    return (
      <>
        <Text>test others card</Text>
      </>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handleShowForecast();
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }}
    >
      <View style={styles.swimBot}>
        <View style={styles.textWithInfoContainerCentered}>
          <Text style={styles.titleText}>Forecast</Text>
          <TouchableOpacity
            onPress={() => setPopupArr((popupArr) => [...popupArr, "forecast"])}
          >
            <Ionicons
              name="md-information-circle-outline"
              size={24}
              color={colours.accent1}
            />
          </TouchableOpacity>
        </View>
        <Modal
          visible={popupArr.includes("forecast")}
          transparent={true}
          animationType="slide"
        >
          <TouchableOpacity
            onPress={() =>
              setPopupArr((popupArr) =>
                popupArr.filter((item) => item !== "forecast")
              )
            }
            style={styles.popupContainerSetup}
          >
            <View style={styles.popupContainer}>
              <Text style={styles.popupTitle}>Forecast</Text>
              <Text style={styles.popupDetails}>
                These forecasts are based on publically available hydrology data
                from the UK's Environmental Agency. By default we analyse data
                from the nearest sample site, but you can change to other nearby
                sites via the dropdown menu if you think they are a better fit.
                {"\n"}
                {"\n"}Data shown here should be used as a guide only - samples
                are not updated regularly and are not intended to be useful to
                swimmers.{"\n"}
                {"\n"}
                You can view data projected over the course of a week by
                expanding this window.
              </Text>
            </View>
          </TouchableOpacity>
        </Modal>
        {showForecast ? (
          <>
            <View style={styles.forecastDatesContainer}>
              {dayBar.map((date, i) => {
                return (
                  <Text
                    style={handleForecastDateStyle(i)}
                    key={i}
                    onPress={() => handleSelectedForecast(date)}
                  >
                    {date}
                  </Text>
                );
              })}
            </View>
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <View style={styles.expandedDataContainer}>
                <Text style={styles.expandedDataTextHeading}>
                  {new Date(
                    dataToDisplay?.weather.values.datetimeStr
                  ).toDateString()}
                </Text>
                <Text style={styles.expandedDataText}>
                  Temperature:{" "}
                  <Text style={styles.expandedDataTextHighlight}>
                    {dataToDisplay?.hydrologyData.data[0]?.maxSurfaceTemp} °C
                  </Text>
                </Text>
                <View style={styles.textWithInfoContainer}>
                  <Text style={styles.expandedDataText}>
                    Oxygen Saturation:{" "}
                    <Text style={styles.expandedDataTextHighlight}>
                      {dataToDisplay?.hydrologyData.data[1]?.mostRecentValue}%
                    </Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setPopupArr((popupArr) => [
                        ...popupArr,
                        "oxygenSaturation",
                      ])
                    }
                  >
                    <Ionicons
                      name="md-information-circle-outline"
                      size={18}
                      color="white"
                      style={{ marginBottom: 4 }}
                    />
                  </TouchableOpacity>
                  <Modal
                    visible={popupArr.includes("oxygenSaturation")}
                    transparent={true}
                    animationType="slide"
                  >
                    <TouchableOpacity
                      onPress={() =>
                        setPopupArr((popupArr) =>
                          popupArr.filter((item) => item !== "oxygenSaturation")
                        )
                      }
                      style={styles.popupContainerSetup}
                    >
                      <View style={styles.popupContainer}>
                        <Text style={styles.popupTitle}>Oxygen Saturation</Text>
                        <Text style={styles.popupDetails}>
                          Water at lower temperatures should have higher mg/L of
                          dissolved oxygen and higher %DO while warmer, polluted
                          waters will have lower mg/L and %DO.{"\n"}
                          {"\n"}
                          Healthy water should generally have dissolved oxygen
                          concentrations above 6.5-8 mg/L and between about
                          80-120 %.
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Modal>
                </View>
                <Text style={styles.expandedDataText}>
                  Cloud Cover:{" "}
                  <Text style={styles.expandedDataTextHighlight}>
                    {dataToDisplay?.weather.values.cloudcover}%
                  </Text>
                </Text>
                <Text style={styles.expandedDataText}>
                  Visibility:{" "}
                  <Text style={styles.expandedDataTextHighlight}>
                    {dataToDisplay?.weather.values.visibility} mi
                  </Text>
                </Text>
                {!!dataToDisplay?.weather.values.snowdepth && (
                  <>
                    <Text style={styles.expandedDataText}>
                      snowdepth:{" "}
                      <Text style={styles.expandedDataTextHighlight}>
                        {dataToDisplay?.weather.values.snowdepth} cm
                      </Text>
                    </Text>
                  </>
                )}
                <Text style={styles.expandedDataText}>
                  Wind Speed:{" "}
                  <Text style={styles.expandedDataTextHighlight}>
                    {dataToDisplay?.weather.values.wspd} mph
                  </Text>
                </Text>
                <Text style={styles.expandedDataText}>
                  Conditions:{" "}
                  <Text style={styles.expandedDataTextHighlight}>
                    {dataToDisplay?.weather.values.conditions}
                  </Text>
                </Text>
              </View>
            )}
          </>
        ) : (
          <>
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <>
                <Dropdown
                  data={siteData}
                  labelField="label"
                  valueField="value"
                  placeholderStyle={styles["displayText--large"]}
                  selectedTextStyle={styles.displayText}
                  itemTextStyle={styles.forecastDates}
                  iconColor="white"
                  placeholder={siteData[selectedSite].label}
                  onChange={(item) => {
                    console.log(item.value);
                    setSelectedSite((selectedSite) => item.value);
                  }}
                />
                <Text style={styles.displayText}>
                  Site Id:{"  "}
                  <Text style={styles["displayText--highlight"]}>
                    {dataToDisplay?.hydrologyData.siteId}
                  </Text>
                </Text>
                <Text style={styles.displayText}>
                  Temperature:{"  "}
                  <Text style={styles["displayText--highlight"]}>
                    {dataToDisplay?.hydrologyData.data[0]?.maxSurfaceTemp} °C
                  </Text>
                </Text>
                <View style={styles.textWithInfoContainer}>
                  <Text style={styles.displayText}>
                    Oxygen Saturation:{"  "}
                    <Text style={styles["displayText--highlight"]}>
                      {dataToDisplay?.hydrologyData.data[1]?.mostRecentValue}%
                    </Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setPopupArr((popupArr) => [
                        ...popupArr,
                        "oxygenSaturation",
                      ])
                    }
                  >
                    <Ionicons
                      name="md-information-circle-outline"
                      size={18}
                      color={colours.accent1}
                      style={{ marginBottom: 4 }}
                    />
                  </TouchableOpacity>
                </View>
                <Modal
                  visible={popupArr.includes("oxygenSaturation")}
                  transparent={true}
                  animationType="slide"
                >
                  <TouchableOpacity
                    onPress={() =>
                      setPopupArr((popupArr) =>
                        popupArr.filter((item) => item !== "oxygenSaturation")
                      )
                    }
                    style={styles.popupContainerSetup}
                  >
                    <View style={styles.popupContainer}>
                      <Text style={styles.popupTitle}>Oxygen Saturation</Text>
                      <Text style={styles.popupDetails}>
                        Water at lower temperatures should have higher mg/L of
                        dissolved oxygen and higher %DO while warmer, polluted
                        waters will have lower mg/L and %DO.{"\n"}
                        {"\n"}
                        Healthy water should generally have dissolved oxygen
                        concentrations above 6.5-8 mg/L and between about 80-120
                        %.
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Modal>
                <Text style={styles.highlightText}>See weekly forecast...</Text>
              </>
            )}
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
