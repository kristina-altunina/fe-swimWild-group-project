import { useState } from "react"
import { styles } from "../../styles/userDataCard"
import { View, TouchableWithoutFeedback, Text, Animated } from "react-native"

export default function UserDataCard({userData}) {
    const [expandUserData, setExpandUserData] = useState(false)

    function handleExpandUserData() {
        setExpandUserData(expandUserData => !expandUserData)
    }

    return (
        <>
        <TouchableWithoutFeedback onPress={handleExpandUserData}>
            <View style={styles.AveUserData}>
                <Text>avStars: {userData.avStars}</Text>
                <Text>outOfDepth: {userData.outOfDepth}</Text>
                <Text>avMins: {userData.avMins}</Text>
                <Text>avKms: {userData.avKms}</Text>
                <Text>mostRecentTemp: {userData.mostRecentTemp.temp} {userData.mostRecentTemp.date}</Text>
                <Text style={expandUserData ? styles.hideContent : styles.showContent}>See More Details..</Text>
                <Animated.View style={expandUserData ? styles.showContent : styles.hideContent}>
                    <Text>feelTemps: {`${userData.feelTemps}`}</Text>
                    <Text>sizes: {`${userData.sizes}`}</Text>
                    <Text>shores: {`${userData.shores}`}</Text>
                    <Text>bankAngles: {`${userData.bankAngles}`}</Text>
                    <Text>clarities: {`${userData.clarities}`}</Text>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
        </>
    )
}