import { styles } from '../../../styles/apiDataCard'
import { useEffect, useState } from "react"
import { TouchableWithoutFeedback, Text, View, LayoutAnimation, ActivityIndicator } from "react-native"
import { getLocationByID } from '../../../scripts/axios'

export default function ApiDataSeaCard({apiData, uid}) {
    const [showForecast, setShowForecast] = useState(false)
    const [selectedForecastDate, setSelectedForecastDate] = useState(1)
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
            <ActivityIndicator size='large'/>
            </>
        )
    }

    console.log(new Date(dataToDisplay.tides.highTides[0]).toTimeString().split(' ')[0])

    return (
        <TouchableWithoutFeedback onPress={() => {
            handleShowForecast()
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        }}>
            <View style={styles.swimBot}>
                <Text style={styles.titleText}>
                            Forecast
                </Text>
                {
                    showForecast
                    ? (
                        <>
                        <View style={styles.forecastDatesContainer}>
                        {
                            day.map((date, i) => {
                                return (
                                    <Text style={handleForecastDateStyle(i)} key={i} onPress={() => handleSelectedForecast(date)}>Day {date}</Text>
                                )
                            })
                        }
                        </View>
                        {
                            isLoading
                            ? (
                                <ActivityIndicator size='large'/>
                            )
                            : (
                                <View style={styles.expandedDataContainer}>
                                    <Text style={styles.expandedDataText}>
                                        datetimeStr: {new Date(dataToDisplay.weather.values.datetimeStr).toDateString()}
                                    </Text>
                                    <Text style={styles.expandedDataText}>
                                        Temperature: {dataToDisplay.tempCelsius} °C
                                    </Text>
                                    <Text style={styles.expandedDataText}>
                                        Max Wave: {dataToDisplay.waveData.maxWave}
                                    </Text>
                                    <Text style={styles.expandedDataText}>
                                        Max Wave Period: {dataToDisplay.waveData.maxWavePeriod}
                                    </Text>
                                    <Text style={styles.expandedDataText}>
                                        Cloud Cover: {dataToDisplay.weather.values.cloudcover} %
                                    </Text>
                                    <Text style={styles.expandedDataText}>
                                        visibility: {dataToDisplay.weather.values.visibility} mi
                                    </Text>
                                    <Text style={styles.expandedDataText}>
                                        snowdepth: {dataToDisplay.weather.values.snowdepth} cm
                                    </Text>
                                    <Text style={styles.expandedDataText}>
                                        Wind Speed: {dataToDisplay.weather.values.wspd} mph
                                    </Text>
                                    <Text style={styles.expandedDataText}>
                                        conditions: {dataToDisplay.weather.values.conditions}
                                    </Text>
                                    <Text style={styles.expandedDataText}>
                                        High Tide:
                                    </Text>
                                    {
                                        dataToDisplay.tides.highTides.map((time, i) => {
                                            return (
                                                <Text style={styles.expandedDataText} key={i}>
                                                    {new Date(time).toTimeString().split(' ')[0]}
                                                </Text>
                                            )
                                        })
                                    }
                                    <Text style={styles.expandedDataText}>
                                        Low Tide:
                                    </Text>
                                    {
                                        dataToDisplay.tides.lowTides.map((time, i) => {
                                            return (
                                                <Text style={styles.expandedDataText} key={i}>
                                                    {new Date(time).toTimeString().split(' ')[0]}
                                                </Text>
                                            )
                                        })
                                    }
                                </View>
                            )
                        }
                        </>
                    )
                    : (
                        <>
                        <Text style={styles.displayText}>
                            Temperature: {dataToDisplay.tempCelsius} °C
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

