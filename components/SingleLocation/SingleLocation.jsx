import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, ActivityIndicator } from "react-native"
import { KeyboardAvoidingView } from "react-native"
import NavBar from "../NavBar"
import { getLocationByID, test } from "../../scripts/axios"
import { useEffect, useState } from "react"
import { styles, props } from '../../styles/singleLocation'
import ApiDataOthersCard from "./components/ApiDataOthersCard"
import UserDataCard from "./components/UserDataCard"
import SwimReviewData from "./components/SwimReviewData"
import ApiDataSeaCard from "./components/ApiDataSeaCard"

export default function SingleLocation({route:{params:{uid}}}) {
const [userData, setUserData] = useState({})
const [apiData, setApiData] = useState({})
const [swimsData, setSwimsData] = useState([])
const [locationData, setLocationData] = useState([])

useEffect(() => {
    const {apiData, userData, swims, location} = test()
    const requestedSwimsData = swims;
    setSwimsData(swimsData => requestedSwimsData)

    getLocationByID(uid)
    .then(data => {
        const {apiData, userData, swims, location} = data
        const requestedUserData = userData;
        const requestedApiData = apiData;
        // const requestedSwimsData = swims;
        const requestedLocation = location;
        setUserData(userData => requestedUserData);
        // setSwimsData(swimsData => requestedSwimsData)
        setApiData(apiData => requestedApiData)
        setLocationData(locationData => requestedLocation)
    })
    .catch(err => {
        console.log(err)
    })
},[])


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
                            {
                                !Object.keys(locationData).length
                                ? (
                                    <>
                                    <ActivityIndicator size='large'/>
                                    </>
                                )
                                : (
                                    <View style={styles.title}>
                                        <Text style={styles.title_text}>
                                            {locationData.name}
                                        </Text>
                                        <Text style={styles.title_text_center}>
                                            Type: {locationData.type}
                                        </Text>
                                    </View>
                                )
                            }
                            {
                                !Object.keys(apiData).length && !Object.keys(locationData).length
                                ? (
                                    <>
                                    <ActivityIndicator size='large'/>
                                    </>
                                )
                                : (
                                    locationData.type === 'sea'
                                    ? (
                                        <ApiDataSeaCard
                                        apiData={apiData}
                                        uid={uid}/>
                                    )
                                    : (
                                        <ApiDataOthersCard
                                        apiData={apiData}
                                        uid={uid}/>
                                    )
                                )
                            }
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
