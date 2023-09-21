import { styles } from '../../styles/apiDataCard'
import { useState } from "react"
import { TouchableWithoutFeedback, Text, View } from "react-native"

export default function ApiDataCard({apiData, }) {
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

    return (
        <>
        <TouchableWithoutFeedback onPress={handleShowForecast}>
        <View style={styles.swimBot}>
            <Text>Temperature: {apiData.tempCelsius}</Text>
            <Text>Max Wave: {apiData.waveData.maxWave}</Text>
            <Text>Max Wave Period: {apiData.waveData.maxWavePeriod}</Text>
            <Text style={showForecast ? styles.hideContent: styles.showContent}>See Forecast...</Text>
            <View style={showForecast ? styles.showContent : styles.hideContent}>
                <View style={styles.swimBotForecastDatesContainer}>
                {
                    apiData.waveData.weekForecast.dates.map((date, i) => {
                        return (
                            <Text style={styles.swimBotForecastDates} key={i} onPress={() => handleSelectedForecast(date)}>{date}</Text>
                        )
                    })
                }
                </View>
                <Text>
                    Wave Height Max: {apiData.waveData.weekForecast.wave_height_max[selectedForecastDate]}
                </Text>
                <Text>
                    Wave Direction Dominant: {apiData.waveData.weekForecast.wave_direction_dominant[selectedForecastDate]}
                </Text>
                <Text>
                    Wave Period Max: {apiData.waveData.weekForecast.wave_period_max[selectedForecastDate]}
                </Text>
                <Text>
                    Wind Wave Height Max: {apiData.waveData.weekForecast.wind_wave_height_max[selectedForecastDate]}
                </Text>
                <Text>
                    Wind Wave Direction Dominant: {apiData.waveData.weekForecast.wind_wave_direction_dominant[selectedForecastDate]}
                </Text>
                <Text>
                    Wind Wave Period Max: {apiData.waveData.weekForecast.wind_wave_period_max[selectedForecastDate]}
                </Text>
                <Text>
                    Wind Wave Peak Period Max: {apiData.waveData.weekForecast.wind_wave_peak_period_max[selectedForecastDate]}
                </Text>
                <Text>
                    Swell Wave Height Max: {apiData.waveData.weekForecast.swell_wave_height_max[selectedForecastDate]}
                </Text>
                <Text>
                    Swell Wave Direction Dominant: {apiData.waveData.weekForecast.swell_wave_direction_dominant[selectedForecastDate]}
                </Text>
                <Text>
                    Swell Wave Period Max: {apiData.waveData.weekForecast.swell_wave_period_max[selectedForecastDate]}
                </Text>
                <Text>
                    Swell Wave Peak Period Max: {apiData.waveData.weekForecast.swell_wave_peak_period_max[selectedForecastDate]}
                </Text>
            </View>
        </View>
        </TouchableWithoutFeedback>
        </>
        
    )
}