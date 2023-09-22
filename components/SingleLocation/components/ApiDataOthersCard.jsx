import { styles } from '../../../styles/apiDataCard'
import { useEffect, useState } from "react"
import { TouchableWithoutFeedback, Text, View, LayoutAnimation, ActivityIndicator, TouchableOpacity } from "react-native"
import { getLocationByID } from '../../../scripts/axios'

export default function ApiDataSeaCard({apiData, uid}) {
    
    const [showForecast, setShowForecast] = useState(false)
    const [selectedForecastDate, setSelectedForecastDate] = useState('Today')
    const [dataToDisplay, setDataToDisplay] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [dayBar, setDayBar] = useState(['Today'])
    const daysRef = ['Mon',
                'Tue',
                'Wed',
                'Thurs',
                'Fri',
                'Sat',
                'Sun']
    

    useEffect(() => {
        setIsLoading(isLoading => !isLoading)
        !Object.keys(dataToDisplay).length
        ? setDataToDisplay(dataToDisplay =>{
            setIsLoading(isLoading => !isLoading)
            return apiData
        })
        : getLocationByID(uid, dayBar.indexOf(selectedForecastDate))
        .then(({apiData}) => {
            setIsLoading(isLoading => !isLoading)
            setDataToDisplay(dataToDisplay => apiData)
        })

    }, [selectedForecastDate])

    useEffect(() => {
        if(dayBar.length !== 7) {
            setDayBar(dayBar => {
                let currentDay = daysRef.indexOf(new Date(apiData.weather.values.datetimeStr).toDateString().split(' ')[0]);
                const arr = [];
    
                while(arr.length !== 6) {
                    if(currentDay < 6) {
                        currentDay++
                        arr.push(daysRef[currentDay])
                    } else {
                        currentDay = 0
                        arr.push(daysRef[currentDay])
                    }
                }
    
                return [...dayBar, ...arr]
            })
        }
    },[])
    
    console.log(dayBar, 'look here')
    function handleShowForecast() {
        setShowForecast(showForecast => !showForecast)
    }

    function handleSelectedForecast(i) {
        setSelectedForecastDate(selectedForecastDate => {
            return i
        })
    }

    function handleForecastDateStyle(i) {
        if(i === dayBar.indexOf(selectedForecastDate)) {
            return styles.selectedForecastDate
        } else {
            return styles.forecastDates
        }
    }

    if(!Object.keys(dataToDisplay).length) {
        return (
            <>
            <Text>test others card</Text>
            </>
        )
    }

    // Water at lower temperatures should have higher mg/L of dissolved oxygen and higher %DO while warmer, polluted waters will have lower mg/L and %DO. Healthy water should generally have dissolved oxygen concentrations above 6.5-8 mg/L and between about 80-120 %.

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
                            dayBar.map((date, i) => {
                                return (
                                    <Text style={handleForecastDateStyle(i)} key={i} onPress={() => handleSelectedForecast(date)}>{date}</Text>
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
                                        Date: {new Date(dataToDisplay.weather.values.datetimeStr).toDateString()}
                                    </Text>
                                    <Text style={styles.expandedDataText}>
                                        Temperature: {dataToDisplay.hydrologyData.data[0].maxSurfaceTemp} °C
                                    </Text>
                                    <Text style={styles.displayText}>
                                        Oxygen Saturation: {dataToDisplay.hydrologyData.data[1].mostRecentValue}%
                                    </Text>
                                    <Text style={styles.expandedDataText}>
                                        Cloud Cover: {dataToDisplay.weather.values.cloudcover} %
                                    </Text>
                                    <Text style={styles.expandedDataText}>
                                        Visibility: {dataToDisplay.weather.values.visibility} mi
                                    </Text>
                                    { !!dataToDisplay.weather.values.snowdepth && (
                                        <>
                                        <Text style={styles.expandedDataText}>
                                            snowdepth: {dataToDisplay.weather.values.snowdepth} cm
                                        </Text>
                                        </>
                                    )}
                                    <Text style={styles.expandedDataText}>
                                        Wind Speed: {dataToDisplay.weather.values.wspd} mph
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
                            Hydrology Test Site: {dataToDisplay.hydrologyData.name}
                            <TouchableOpacity>
                                <Text>See more sites..</Text>
                            </TouchableOpacity>
                        </Text>
                        <Text style={styles.displayText}>
                            Site Id: {dataToDisplay.hydrologyData.siteId}
                        </Text>
                        <Text style={styles.displayText}>
                            Temperature: {dataToDisplay.hydrologyData.data[0].maxSurfaceTemp} °C
                        </Text>
                        <Text style={styles.displayText}>
                            Oxygen Saturation: {dataToDisplay.hydrologyData.data[1].mostRecentValue}%
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

