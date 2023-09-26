import { useState } from "react"
import { View, TouchableWithoutFeedback, Text, Image, LayoutAnimation, ActivityIndicator } from "react-native"
import { styles } from "../../../styles/swimReviewData"
import StarRating from 'react-native-star-rating'

export default function SwimReviewData({swimsData, navigation}) {

    function handleExpandSwimReview(swim) {
        return navigation.navigate('SwimSpot', {swim})
    }

    function StarRatingDisplay({num}) {
        return (
            <View style={styles.starRatingDisplay}>
                <Text>
                    Rating: 
                </Text>
                <StarRating
                disabled={true}
                maxStars={5}
                starSize={18}
                rating={num}
                fullStarColor="yellow"
                />
            </View>
        )
    }
    
    return (
        <>
        <View style={styles.swimReviewGroup}>
            <Text style={styles.titleText}>
                Reviews
            </Text>
        {
            !Object.keys(swimsData).length
            ? (<ActivityIndicator size='large'/>)
            : (
                swimsData.map((swim, i) => {
                    return (
                        <TouchableWithoutFeedback onPress={() => {
                            handleExpandSwimReview(swim)
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                        }}
                        key={i}>
                            <View style={styles.swimReviewItem}>
                            <Image style={styles.profileImage} source={{uri: swim.profileImg}}/>
                            <View style={styles.textContainer}>
                                <Text>
                                    {swim.nickname}
                                </Text>
                                <Text style={styles.notes}>
                                    {swim.notes}
                                </Text>
                                <View style={styles.flexRow}>
                                    <StarRatingDisplay
                                    num={swim.stars}/>
                                    <Text>
                                        {new Date(swimsData[0]?.date)?.toDateString()}
                                    </Text>
                                </View>
                                <Text style={styles.showContent}>
                                    See Swimmer's Experience...
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    )
                })
            )
        }
        </View> 
        </>
    )
}