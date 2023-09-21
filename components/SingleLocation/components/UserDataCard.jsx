import { useState } from "react"
import { View, TouchableWithoutFeedback, Text, LayoutAnimation, ActivityIndicator } from "react-native"
import { styles } from "../../../styles/userDataCard"

export default function UserDataCard({userData}) {
    const [expandUserData, setExpandUserData] = useState(false)

    function handleExpandUserData() {
        setExpandUserData(expandUserData => !expandUserData)
    }

    return (
        <>
        <TouchableWithoutFeedback onPress={() => {
            handleExpandUserData()
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        }}>
            {
                !Object.keys(userData).length
                ? (
                <ActivityIndicator size='large'/>
                )
                : (
                    <View style={styles.AveUserData}>
                <Text style={styles.displayText}>
                    Swimmers Average Reviews
                </Text>
                <Text style={styles.displayText}>
                    avStars: {userData.avStars || 'No Swimmer Review yet'}
                </Text>
                <Text style={styles.displayText}>
                    outOfDepth: {userData.outOfDepth || 'No Swimmer Review yet'}
                </Text>
                <Text style={styles.displayText}>
                    avMins: {userData.avMins || 'No Swimmer Review yet'}
                </Text>
                <Text style={styles.displayText}>
                    avKms: {userData.avKms || 'No Swimmer Review yet'}
                </Text>
                <Text style={styles.displayText}>
                    mostRecentTemp: {userData.mostRecentTemp.temp || 'No Swimmer Review yet'} {userData.mostRecentTemp.date}
                </Text>
                <Text style={expandUserData ? styles.hideContent : styles.showContent}>
                    See More Details..
                </Text>
                {expandUserData && (
                    <View style={styles.expandedData}>
                    <Text style={styles.displayText}>
                        feelTemps: {`${userData.feelTemps}`}
                    </Text>
                    <Text style={styles.displayText}>
                        sizes: {`${userData.sizes}`}
                    </Text>
                    <Text style={styles.displayText}>
                        shores: {`${userData.shores}`}
                    </Text>
                    <Text style={styles.displayText}>
                        bankAngles: {`${userData.bankAngles}`}
                    </Text>
                    <Text style={styles.displayText}>
                        clarities: {`${userData.clarities}`}
                    </Text>
                    </View>
                )}
            </View>
                )
            }
        </TouchableWithoutFeedback>
        </>
    )
}