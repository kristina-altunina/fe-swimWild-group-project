import { styles } from '../../../styles/apiDataCard'
import { useState } from "react"
import { TouchableWithoutFeedback, Text, View, LayoutAnimation, ActivityIndicator } from "react-native"

export default function ApiDataSeaCard({apiData}) {
    const [showForecast, setShowForecast] = useState(false)
    const [selectedForecastDate, setSelectedForecastDate] = useState(0)
    
    function handleShowForecast() {
        setShowForecast(showForecast => !showForecast)
    }

    function handleSelectedForecast(date) {
        setSelectedForecastDate(selectedForecastDate => {
            return apiData.waveData.weekForecast.dates.indexOf(date)
        })
    }

    function handleForecastDateStyle(i) {
        if(i === selectedForecastDate) {
            return styles.selectedForecastDate
        } else {
            return styles.forecastDates
        }
    }

    return (
        <>
        <TouchableWithoutFeedback onPress={() => {
            handleShowForecast()
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        }}>
        {
            !Object.keys(apiData).length
            ? (
                <ActivityIndicator size='large'/>
            )
            : (
                <View style={styles.swimBot}>
                    <Text style={styles.displayText}>Location Details and Forecast</Text>
                    <Text style={styles.displayText}>Temperature: {apiData.tempCelsius}</Text>
                    <Text style={styles.displayText}>Max Wave: {apiData.waveData.maxWave}</Text>
                    <Text style={styles.displayText}>Max Wave Period: {apiData.waveData.maxWavePeriod}</Text>
                    <Text style={showForecast ? styles.hideContent: styles.showContent}>See Forecast...</Text>
                    {showForecast && (
                    <>
                    <View style={styles.forecastDatesContainer}>
                    {
                        apiData.waveData.weekForecast.dates.map((date, i) => {
                            return (
                                <Text style={handleForecastDateStyle(i)} key={i} onPress={() => handleSelectedForecast(date)}>{date}</Text>
                            )
                        })
                    }
                    </View>
                    <View style={styles.expandedDataContainer}>
                        <Text style={styles.expandedDataText}>
                            Wave Height Max: {apiData.waveData.weekForecast.wave_height_max[selectedForecastDate]}
                        </Text>
                        <Text style={styles.expandedDataText}>
                            Wave Direction Dominant: {apiData.waveData.weekForecast.wave_direction_dominant[selectedForecastDate]}
                        </Text>
                        <Text style={styles.expandedDataText}>
                            Wave Period Max: {apiData.waveData.weekForecast.wave_period_max[selectedForecastDate]}
                        </Text>
                        <Text style={styles.expandedDataText}>
                            Wind Wave Height Max: {apiData.waveData.weekForecast.wind_wave_height_max[selectedForecastDate]}
                        </Text>
                        <Text style={styles.expandedDataText}>
                            Wind Wave Direction Dominant: {apiData.waveData.weekForecast.wind_wave_direction_dominant[selectedForecastDate]}
                        </Text>
                        <Text style={styles.expandedDataText}>
                            Wind Wave Period Max: {apiData.waveData.weekForecast.wind_wave_period_max[selectedForecastDate]}
                        </Text>
                        <Text style={styles.expandedDataText}>
                            Wind Wave Peak Period Max: {apiData.waveData.weekForecast.wind_wave_peak_period_max[selectedForecastDate]}
                        </Text>
                        <Text style={styles.expandedDataText}>
                            Swell Wave Height Max: {apiData.waveData.weekForecast.swell_wave_height_max[selectedForecastDate]}
                        </Text>
                        <Text style={styles.expandedDataText}>
                            Swell Wave Direction Dominant: {apiData.waveData.weekForecast.swell_wave_direction_dominant[selectedForecastDate]}
                        </Text>
                        <Text style={styles.expandedDataText}>
                            Swell Wave Period Max: {apiData.waveData.weekForecast.swell_wave_period_max[selectedForecastDate]}
                        </Text>
                        <Text style={styles.expandedDataText}>
                            Swell Wave Peak Period Max: {apiData.waveData.weekForecast.swell_wave_peak_period_max[selectedForecastDate]}
                        </Text>
                    </View>
                    </>
                    )}
                </View>
            )
        }
        </TouchableWithoutFeedback>
        </>
    )
}

