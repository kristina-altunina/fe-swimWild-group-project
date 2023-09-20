import { View, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, Button, ScrollView, Image } from "react-native"
import { KeyboardAvoidingView } from "react-native"
import NavBar from "./NavBar"
import { getAllLocations, getLocationByID, test } from "../scripts/axios"
import { useEffect, useState } from "react"
import { styles, props } from '../styles/singleLocation'

export default function SingleLocation({route:{params:{uid}}}) {
const [userData, setUserData] = useState({})
const [apiData, setApiData] = useState({})
const [swimsData, setSwimsData] = useState([])
const [locationData, setLocationData] = useState([])
const [selectedForecastDate, setSelectedForecastDate] = useState(0)
const [showForecast, setShowForecast] = useState(false)
const [expandUserData, setExpandUserData] = useState(false)
const [expandReview, setExpandReview] = useState([])

useEffect(() => {
    const {apiData, userData, swims, location} = test()
    // const requestedUserData = userData;
    const requestedApiData = apiData;
    const requestedSwimsData = swims;
    // const requestedLocation = location;
    // setUserData(userData => requestedUserData);
    setSwimsData(swimsData => requestedSwimsData)
    setApiData(apiData => requestedApiData)
    // setLocationData(locationData => requestedLocation)

    getLocationByID(uid)
    .then(data => {
        const {apiData, userData, swims, location} = data
        const requestedUserData = userData;
        // const requestedApiData = apiData;
        // const requestedSwimsData = swims;
        const requestedLocation = location;
        setUserData(userData => requestedUserData);
        // setSwimsData(swimsData => requestedSwimsData)
        // setApiData(apiData => requestedApiData)
        setLocationData(locationData => requestedLocation)
    })
    .catch(err => {
        console.log(err)
    })
},[])

    function handleSelectedForecast(date) {
        setSelectedForecastDate(selectedForecastDate => {
            return apiData.waveData.weekForecast.dates.indexOf(date)
        })
    }

    function handleShowForecast() {
        setShowForecast(showForecast => !showForecast)
    }

    function handleExpandUserData() {
        setExpandUserData(expandUserData => !expandUserData)
    }

    function handleExpandSwimReview(i) {
        console.log(expandReview, 'look here')
        if(!expandReview.includes(i)) {
            setExpandReview(expandReview => [...expandReview, i])
        } else {
            setExpandReview(expandReview => [...expandReview.filter(item => item !== i)])
        }
    }

    function handleExpandSwimReviewStyle(i) {
        if(expandReview.includes(i)) {
            return styles.showContent
        } else {
            return styles.hideContent
        }
    }

    console.log('------------------------------------------------------------')
    if(!Object.keys(userData).length || !Object.keys(apiData).length || !Object.keys(swimsData).length) {
        return (
            <View>
                <Text>Loading...........</Text>
            </View>
        )
    }

    return (
			<KeyboardAvoidingView
				behavior={props.KeyboardAvoidingView.behavior}
				keyboardVerticalOffset={props.KeyboardAvoidingView.keyboardVerticalOffset}
                
				style={styles.KeyboardAvoidingView}>
                    <ScrollView>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                
					<View style={styles.screen}>
						<NavBar />
                        <View style={styles.display}>
                            <View style={styles.title}>
                                <Text style={styles.title_text}>
                                    {locationData.name}
                                </Text>
                            </View>
                            <TouchableWithoutFeedback onPress={handleShowForecast}>
                            <View style={styles.swimBot}>
                                <Text>Temperature: {apiData.tempCelsius}</Text>
                                <Text>Max Wave: {apiData.waveData.maxWave}</Text>
                                <Text>Max Wave Period: {apiData.waveData.maxWavePeriod}</Text>
                                <Text>See Forecast...</Text>
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

                            <TouchableWithoutFeedback onPress={handleExpandUserData}>
                            <View style={styles.AveUserData}>
                                <Text>avStars: {userData.avStars}</Text>
                                <Text>outOfDepth: {userData.outOfDepth}</Text>
                                <Text>avMins: {userData.avMins}</Text>
                                <Text>avKms: {userData.avKms}</Text>
                                <Text>mostRecentTemp: {userData.mostRecentTemp.temp} {userData.mostRecentTemp.date}</Text>
                                <View style={expandUserData ? styles.showContent : styles.hideContent}>
                                    <Text>feelTemps: {`${userData.feelTemps}`}</Text>
                                    <Text>sizes: {`${userData.sizes}`}</Text>
                                    <Text>shores: {`${userData.shores}`}</Text>
                                    <Text>bankAngles: {`${userData.bankAngles}`}</Text>
                                    <Text>clarities: {`${userData.clarities}`}</Text>
                                </View>
                            </View>
                            </TouchableWithoutFeedback>


                            <View style={styles.summary}>
                                <Text>plan a new swim, summary pop up etc(no data)</Text>
                            </View>
                            
                            
                            <View style={styles.swimReviewGroup}>
                            {
                                swimsData.map((swim, i) => {
                                    return (
                                        <TouchableWithoutFeedback onPress={() => handleExpandSwimReview(i)}>
                                            <View key={i} style={styles.swimReviewItem}>
                                            <Image style={styles.profileImage} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Mad_scientist_transparent_background.svg/1200px-Mad_scientist_transparent_background.svg.png'}}/>
                                            <View>
                                                <Text>Nickname: {swim.nickname}</Text>
                                                <Text>Notes: {swim.notes}</Text>
                                                <Text>stars: {swim.stars}</Text>
                                                <Text>date: {swim.date}</Text>
                                                
                                                <View style={handleExpandSwimReviewStyle(i)}>
                                                    <Text>recordTemp: {swim.recordTemp}</Text>
                                                    <Text>feelTemp: {swim.feelTemp}</Text>
                                                    <Text>mins: {swim.mins}</Text>
                                                    <Text>outOfDepth: {swim.outOfDepth}</Text>
                                                    <Text>shore: {swim.shore}</Text>
                                                    <Text>bankAngle: {swim.bankAngle}</Text>
                                                    <Text>clarity: {swim.clarity}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    )
                                })
                            }
                            </View>                            
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
    )
        
}

