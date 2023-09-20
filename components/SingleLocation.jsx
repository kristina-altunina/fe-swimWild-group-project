import { View, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, Button } from "react-native"
import { KeyboardAvoidingView } from "react-native"
import NavBar from "./NavBar"
import { getAllLocations, getLocationByID, test } from "../scripts/axios"
import { useEffect, useState } from "react"
import { styles, props } from '../styles/singleLocation'

export default function SingleLocation({route:{params:{uid}}}) {
const [userData, setUserData] = useState({})
const [apiData, setApiData] = useState({})
const [swimsData, setSwimsData] = useState([])
const [selectedForecastDate, setSelectedForecastDate] = useState('')

useEffect(() => {
    const {apiData, userData, swims} = test()
    const requestedUserData = userData;
    const requestedApiData = apiData;
    const requestedSwimsData = swims;
    setUserData(userData => requestedUserData);
    setSwimsData(swimsData => requestedSwimsData)
    setApiData(apiData => requestedApiData)
    setSelectedForecastDate(selectedForecastDate => requestedApiData.waveData.weekForecast.dates[0])
},[])

    // console.log(userData ,'userData')
    // console.log(apiData, 'apiData')
    // console.log(swimsData, 'swimsData')
    // console.log(Object.keys(apiData))
    // console.log(!Object.keys(apiData).length)

    function handleSelectedForecast(e) {
        console.log(e)
    }

    console.log('------------------------------------------------------------')
    if(!Object.keys(apiData).length) {
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
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.screen}>
						<NavBar />
                        <View style={styles.display}>
                            <View style={styles.title}>
                                <Text style={styles.title_text}>
                                    {userData.name}
                                </Text>
                            </View>



                            <View style={styles.swimBot}>
                                <Text>Temperature: {apiData.tempCelsius}</Text>
                                <Text>Max Wave: {apiData.waveData.maxWave}</Text>
                                <Text>Max Wave Period: {apiData.waveData.maxWavePeriod}</Text>
                                {
                                    apiData.waveData.weekForecast.dates.map(date => {
                                        return (
                                            <Button title={date} onPress={() => handleSelectedForecast(date)}></Button>
                                        )
                                    })
                                }
                            </View>



                            <View style={styles.AveUserData}>
                                <Text>average user data(no data)</Text>
                            </View>
                            <View style={styles.summary}>
                                <Text>plan a new swim, summary pop up etc(no data)</Text>
                            </View>
                            <View style={styles.swimPreviewGroup}>
                            {
                                // testData.map(test => {
                                //     return (
                                //         <View style={styles.swimPreviewItem}>
                                //             <Text>{test.name}</Text>
                                //         </View>
                                //     )
                                // })
                            }
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
    )
        
}

