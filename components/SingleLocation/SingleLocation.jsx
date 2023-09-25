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
import InfoCard from "./components/InfoCard"

export default function SingleLocation({route:{params:{uid}}, navigation}) {
const [userData, setUserData] = useState({})
const [apiData, setApiData] = useState({})
const [swimsData, setSwimsData] = useState([])
const [locationData, setLocationData] = useState([])
const [infoData, setInfoData] = useState({})

useEffect(() => {
    getLocationByID(uid)
    .then(data => {
        const {apiData, userData, swims, location, info} = data
        const requestedUserData = userData;
        const requestedApiData = apiData;
        const requestedSwimsData = swims;
        const requestedLocationData = location;
        const requestInfoData = info;
        setUserData(userData => requestedUserData);
        setSwimsData(swimsData => requestedSwimsData)
        setApiData(apiData => requestedApiData)
        setLocationData(locationData => requestedLocationData)
        setInfoData(infoData => requestInfoData)
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
						<NavBar navigation={navigation}/>
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
                            <InfoCard info={infoData}/>
                            <SwimReviewData swimsData={swimsData}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
    )
        
}

