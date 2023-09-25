import { useState } from "react"
import { View, TouchableWithoutFeedback, Text, LayoutAnimation, ActivityIndicator } from "react-native"
import { styles } from "../../../styles/userDataCard"
import StarRating from 'react-native-star-rating'

export default function UserDataCard({userData}) {
    const [expandUserData, setExpandUserData] = useState(false)

    function handleExpandUserData() {
        setExpandUserData(expandUserData => !expandUserData)
    }

    function StarRatingDisplay({num}) {
        return (
            <View style={styles.starRatingDisplay}>
                <Text style={{color: 'white'}}>
                    Average Rating: 
                </Text>
                <StarRating
                disabled={true}
                maxStars={5}
                starSize={18}
                rating={4}
                fullStarColor="yellow"
                emptyStarColor="white"
                />
            </View>
        )
    }

    function handleObjectData(data) {
        return (
            <>
            {
                Object.entries(data).map((pair, i) => {
                    const dataName = pair[0][0].toUpperCase() + pair[0].split('').slice(1).join('')
                    return (
                        <View key={i}>
                        <Text style={styles.marginLeft}>
                            {dataName} : {pair[1]}
                        </Text>
                        </View>
                    )
                })
            }
            </>
        )
    }

    console.log(userData)

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
                        <Text style={styles.titleText}>
                            Swimmers Average Reviews
                        </Text>
                        {
                            !expandUserData
                            ? (
                                <>
                                <StarRatingDisplay
                                    num={userData.avStars}/>
                                <Text style={styles.displayText}>
                                    Out of Depth: {`${userData.outOfDepth}` || 'No Swimmer Review yet'}
                                </Text>
                                <Text style={styles.displayText}>
                                    Average Minutes: {`${userData.avMins} mins` || 'No Swimmer Review yet'}
                                </Text>
                                <Text style={styles.displayText}>
                                    Most recent temp from swimmer: {`${userData.mostRecentTemp.temp}°C last` || 'No Swimmer Review yet'} {userData.mostRecentTemp.temp
                                    ? new Date(userData.mostRecentTemp.date).toDateString()
                                    : ''}
                                </Text>
                                <Text style={expandUserData ? styles.hideContent : styles.showContent}>
                                    See More Details..
                                </Text>
                                </>
                            )
                            : (
                                <>
                                <View style={styles.expandedData}>
                                    <StarRatingDisplay
                                    num={userData.avStars}/>
                                    <Text style={styles.displayText}>
                                        Out of Depth: {`${userData.outOfDepth}` || 'No Swimmer Review yet'}
                                    </Text>
                                    <Text style={styles.displayText}>
                                        Average Minutes: {`${userData.avMins} mins` || 'No Swimmer Review yet'}
                                    </Text>
                                    <Text style={styles.displayText}>
                                    Most recent temp from swimmer: {`${userData.mostRecentTemp.temp}°C last` || 'No Swimmer Review yet'} {userData.mostRecentTemp.temp
                                    ? new Date(userData.mostRecentTemp.date).toDateString()
                                    : ''}
                                </Text>
                                {
                                    Object.keys(userData.feelTemps).length
                                    ? (
                                        <>
                                        <Text style={styles.displayText}>
                                            Feels like Temperature:
                                        </Text>
                                        {
                                            handleObjectData(userData.feelTemps)
                                        }
                                        </>
                                    )
                                    : (
                                        <></>
                                    )
                                }
                                {
                                    Object.keys(userData.sizes).length && (
                                        <>
                                        <Text style={styles.displayText}>
                                            Sizes:
                                        </Text>
                                        {
                                            handleObjectData(userData.sizes)
                                        }
                                        </>
                                    )
                                }
                                {
                                    Object.keys(userData.shores).length && (
                                        <>
                                        <Text style={styles.displayText}>
                                            Shores:
                                        </Text>
                                        {
                                            handleObjectData(userData.shores)
                                        }
                                        </>
                                    )
                                }
                                {
                                    Object.keys(userData.bankAngles).length && (
                                        <>
                                        <Text style={styles.displayText}>
                                            Bank Angles:
                                        </Text>
                                        {
                                            handleObjectData(userData.bankAngles)
                                        }
                                        </>
                                    )
                                }
                                {
                                    Object.keys(userData.clarities).length && (
                                        <>
                                        <Text style={styles.displayText}>
                                            Clarities:
                                        </Text>
                                        {
                                            handleObjectData(userData.clarities)
                                        }
                                        </>
                                    )
                                }
                                </View>
                                </>
                            )
                        }

                    </View>
                )
            }
        </TouchableWithoutFeedback>
        </>
    )
}