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
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { colours } from "../../../styles/base";

export default function ApiDataSeaCard({ apiData, uid }) {
  const [showForecast, setShowForecast] = useState(false);
  const [selectedForecastDate, setSelectedForecastDate] = useState("Today");
  const [dataToDisplay, setDataToDisplay] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dayBar, setDayBar] = useState(["Today"]);
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
      : getLocationByID(uid, dayBar.indexOf(selectedForecastDate))
          .then(({ apiData }) => {
            setIsLoading((isLoading) => !isLoading);
            setDataToDisplay((dataToDisplay) => apiData);
          })
          .catch((err) => {
            console.log(err);
          });
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

  function createTidesString(tides) {
    tides = tides.map((tide) => {
      return new Date(
        Math.round(new Date(tide).getTime() / (1000 * 60 * 60)) * 1000 * 60 * 60
      ).toISOString();
    });
    return tides
      .reduce((a, b) => {
        return (
          new Date(b)
            .toTimeString()
            .split(" ")[0]
            .split(":")
            .slice(0, 2)
            .join(":") +
          "  •  " +
          a
        );
      }, "")
      .slice(0, -5);
  }

  if (!Object.keys(dataToDisplay).length) {
    return (
      <>
        <ActivityIndicator size="large" />
      </>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handleShowForecast();
        LayoutAnimation.configureNext({
          duration: 300,
          create: {
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.opacity,
          },
          update: {
            type: LayoutAnimation.Types.easeInEaseOut,
          },
        });
      }}
    >
      <View style={styles.swimBot}>
        <Text style={styles.titleText}>Forecast</Text>
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
                  Sea Temperature:{"  "}
                  <Text style={styles["displayText--highlight"]}>
                    {dataToDisplay?.tempCelsius} °C
                  </Text>
                </Text>
                <Text style={styles.expandedDataText}>
                  Max Wave:{"  "}
                  <Text style={styles["displayText--highlight"]}>
                    {dataToDisplay?.waveData.maxWave}
                  </Text>
                </Text>
                <Text style={styles.expandedDataText}>
                  Max Wave Period:{"  "}
                  <Text style={styles["displayText--highlight"]}>
                    {dataToDisplay?.waveData.maxWavePeriod}
                  </Text>
                </Text>
                <Text style={styles.expandedDataText}>
                  Cloud Cover:{"  "}
                  <Text style={styles["displayText--highlight"]}>
                    {dataToDisplay?.weather.values.cloudcover}%
                  </Text>
                </Text>
                <Text style={styles.expandedDataText}>
                  Visibility:{"  "}
                  <Text style={styles["displayText--highlight"]}>
                    {dataToDisplay?.weather.values.visibility} mi
                  </Text>
                </Text>
                {!!dataToDisplay?.weather.values.snowdepth && (
                  <>
                    <Text style={styles.expandedDataText}>
                      Snow depth:{"  "}
                      <Text style={styles["displayText--highlight"]}>
                        {dataToDisplay?.weather.values.snowdepth} cm
                      </Text>
                    </Text>
                  </>
                )}
                <Text style={styles.expandedDataText}>
                  Wind Speed:{"  "}
                  <Text style={styles["displayText--highlight"]}>
                    {dataToDisplay?.weather.values.wspd} mph
                  </Text>
                </Text>
                <Text style={styles.expandedDataText}>
                  Conditions:{"  "}
                  <Text style={styles["displayText--highlight"]}>
                    {dataToDisplay?.weather.values.conditions}
                  </Text>
                </Text>
                {dataToDisplay?.tides.highTides.length && (
                  <>
                    <Text style={styles.expandedDataText}>
                      High Tides (approx):{"  "}
                      <Text style={styles["displayText--highlight"]}>
                        {createTidesString(dataToDisplay?.tides.highTides)}
                      </Text>
                    </Text>
                  </>
                )}
                <Text style={styles.expandedDataText}>
                  Low Tides (approx):{"  "}
                  <Text style={styles["displayText--highlight"]}>
                    {createTidesString(dataToDisplay?.tides.lowTides)}
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
                <Text style={styles.displayText}>
                  Temperature:{"  "}
                  <Text style={styles["displayText--highlight"]}>
                    {dataToDisplay?.tempCelsius} °C
                  </Text>
                </Text>
                <View style={styles.textWithInfoContainer}>
                  <Text style={styles.displayText}>
                    Max Wave:{"  "}
                    <Text style={styles["displayText--highlight"]}>
                      {dataToDisplay?.waveData.maxWave}
                    </Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setPopupArr((popupArr) => [...popupArr, "maxWave"])
                    }
                  >
                    <Ionicons
                      name="md-information-circle-outline"
                      size={24}
                      color={colours.accent1}
                      style={{ marginBottom: 4 }}
                    />
                  </TouchableOpacity>
                </View>
                <Modal
                  visible={popupArr.includes("maxWave")}
                  transparent={true}
                  animationType="slide"
                >
                  <TouchableOpacity
                    onPress={() =>
                      setPopupArr((popupArr) =>
                        popupArr.filter((item) => item !== "maxWave")
                      )
                    }
                    style={styles.popupContainerSetup}
                  >
                    <View style={styles.popupContainer}>
                      <Text style={styles.popupTitle}>Max Wave</Text>
                      <Text style={styles.popupDetails}>
                        Wave height is affected by wind speed, wind duration (or
                        how long the wind blows), and fetch, which is the
                        distance over water that the wind blows in a single
                        direction. If wind speed is slow, only small waves
                        result, regardless of wind duration or fetch.
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Modal>
                <View style={styles.textWithInfoContainer}>
                  <Text style={styles.displayText}>
                    Max Wave Period:{"  "}
                    <Text style={styles["displayText--highlight"]}>
                      {dataToDisplay?.waveData.maxWavePeriod}
                    </Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setPopupArr((popupArr) => [...popupArr, "maxWavePeriod"])
                    }
                  >
                    <Ionicons
                      name="md-information-circle-outline"
                      size={24}
                      color={colours.accent1}
                      style={{ marginBottom: 4 }}
                    />
                  </TouchableOpacity>
                </View>
                <Modal
                  visible={popupArr.includes("maxWavePeriod")}
                  transparent={true}
                  animationType="slide"
                >
                  <TouchableOpacity
                    onPress={() =>
                      setPopupArr((popupArr) =>
                        popupArr.filter((item) => item !== "maxWavePeriod")
                      )
                    }
                    style={styles.popupContainerSetup}
                  >
                    <View style={styles.popupContainer}>
                      <Text style={styles.popupTitle}>Max Wave Period</Text>
                      <Text style={styles.popupDetails}>
                        Wave period is measured in seconds and is the gap
                        between one wave and the next. Simply said the wave
                        period is the amount in seconds that pass between each
                        wave. The higher the wave period, the more energy in the
                        swell and so the larger the wave and more often than not
                        this results in better quality waves for surfing.
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Modal>
                <Text style={styles.highlightText}>See Forecast...</Text>
              </>
            )}
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
