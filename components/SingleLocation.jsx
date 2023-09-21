import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native"
import { KeyboardAvoidingView } from "react-native"
import NavBar from "./NavBar"
import { getLocationByID, test } from "../scripts/axios"
import { useEffect, useState } from "react"
import { styles, props } from '../styles/singleLocation'
import ApiDataCard from "./SingleLocationComponents/ApiDataCard"
import UserDataCard from "./SingleLocationComponents/UserDataCard"
import SwimReviewData from "./SingleLocationComponents/SwimReviewData"

export default function SingleLocation({route:{params:{uid}}}) {
const [userData, setUserData] = useState({})
const [apiData, setApiData] = useState({})
const [swimsData, setSwimsData] = useState([])
const [locationData, setLocationData] = useState([])

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
                            <ApiDataCard apiData={apiData}/>
                            <UserDataCard userData={userData}/>
                            <View style={styles.summary}>
                                <Text>plan a new swim, summary pop up etc(no data)</Text>
                            </View>
                        <SwimReviewData swimsData={swimsData}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
    )
        
}

