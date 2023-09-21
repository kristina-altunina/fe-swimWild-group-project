import { styles } from '../../../styles/apiDataCard'
import { useEffect, useState } from "react"
import { TouchableWithoutFeedback, Text, View, LayoutAnimation } from "react-native"
import { getLocationByID } from '../../../scripts/axios'

export default function ApiDataSeaCard({apiData, uid}) {
    console.log(apiData.weather.values.wdir)
    const [showForecast, setShowForecast] = useState(false)
    const [selectedForecastDate, setSelectedForecastDate] = useState(0)
    const [dataToDisplay, setDataToDisplay] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const day = [1,2,3,4,5,6,7];

    useEffect(() => {
        setIsLoading(isLoading => !isLoading)
        !Object.keys(dataToDisplay).length
        ? setDataToDisplay(dataToDisplay =>{
            setIsLoading(isLoading => !isLoading)
            return apiData
        })
        : getLocationByID(uid, day.indexOf(selectedForecastDate))
        .then(({apiData}) => {
            setIsLoading(isLoading => !isLoading)
            setDataToDisplay(dataToDisplay => apiData)
        })
    }, [selectedForecastDate])
    
    function handleShowForecast() {
        setShowForecast(showForecast => !showForecast)
    }

    function handleSelectedForecast(i) {
        setSelectedForecastDate(selectedForecastDate => {
            return i
        })
    }

    function handleForecastDateStyle(i) {
        if(i === day.indexOf(selectedForecastDate)) {
            return styles.selectedForecastDate
        } else {
            return styles.forecastDates
        }
    }

    if(!Object.keys(dataToDisplay).length) {
        return (
            <>
            <Text>test</Text>
            </>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            handleShowForecast()
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        }}>
            <View style={styles.swimBot}>
                <Text style={styles.displayText}>
                            Location Details and Forecast
                </Text>
                {
                    showForecast
                    ? (
                        <>
                        <View style={styles.forecastDatesContainer}>
                        {
                            day.map((date, i) => {
                                return (
                                    <Text style={handleForecastDateStyle(i)} key={i} onPress={() => handleSelectedForecast(date)}>{date}</Text>
                                )
                            })
                        }
                        </View>
                        {
                            isLoading
                            ? (
                                <>
                                <Text>is Loading</Text>
                                </>
                            )
                            : (
                                <View style={styles.expandedDataContainer}>
                            <Text style={styles.expandedDataText}>
                                Temperature: {dataToDisplay.tempCelsius}
                            </Text>
                            <Text style={styles.expandedDataText}>
                                Max Wave: {dataToDisplay.waveData.maxWave}
                            </Text>
                            <Text style={styles.expandedDataText}>
                                Max Wave Period: {dataToDisplay.waveData.maxWavePeriod}
                            </Text>
                            <Text style={styles.expandedDataText}>
                                wdir: {dataToDisplay.weather.values.wdir}
                            </Text>
                            <Text style={styles.expandedDataText}>
                                uvindex: {dataToDisplay.weather.values.uvindex}
                            </Text>
                            <Text style={styles.expandedDataText}>
                                datetimeStr: {dataToDisplay.weather.values.datetimeStr}
                            </Text>
                            <Text style={styles.expandedDataText}>
                                preciptype: {dataToDisplay.weather.values.preciptype}
                            </Text>
                            <Text style={styles.expandedDataText}>
                                cloudcover: {dataToDisplay.weather.values.cloudcover}
                            </Text>
                            <Text style={styles.expandedDataText}>
                                humidity: {dataToDisplay.weather.values.humidity}
                            </Text>
                            <Text style={styles.expandedDataText}>
                                temp: {dataToDisplay.weather.values.temp}
                            </Text>
                            <Text style={styles.expandedDataText}>
                                visibility: {dataToDisplay.weather.valuesvisibility}
                            </Text>
                            <Text style={styles.expandedDataText}>
                                snow: {dataToDisplay.weather.values.snow}
                            </Text>
                            <Text style={styles.expandedDataText}>
                                snowdepth: {dataToDisplay.weather.values.snowdepth}
                            </Text>
                            <Text style={styles.expandedDataText}>
                                conditions: {dataToDisplay.weather.values.conditions}
                            </Text>
                        </View>
                            )
                        }
                        </>
                    )
                    : (
                        <>
                        <Text style={styles.displayText}>
                            Temperature: {dataToDisplay.tempCelsius}
                        </Text>
                        <Text style={styles.displayText}>
                            Max Wave: {dataToDisplay.waveData.maxWave}
                        </Text>
                        <Text style={styles.displayText}>
                            Max Wave Period: {dataToDisplay.waveData.maxWavePeriod}
                        </Text>
                        <Text style={styles.highlightText}>
                            See Forecast...
                        </Text>
                        </>
                    )
                    
                }
            </View>        
        </TouchableWithoutFeedback>
    )
}

