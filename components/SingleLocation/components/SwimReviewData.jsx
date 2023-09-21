import { useState } from "react"
import { View, TouchableWithoutFeedback, Text, Image, LayoutAnimation, ActivityIndicator } from "react-native"
import { styles } from "../../../styles/swimReviewData"

export default function SwimReviewData({swimsData}) {
    const [expandReview, setExpandReview] = useState([])

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
            return styles.hideContent 
        } else {
            return styles.showContent
        }
    }

    return (
        <>
        <View style={styles.swimReviewGroup}>
        {
            !Object.keys(swimsData).length
            ? (<ActivityIndicator size='large'/>)
            : (
                swimsData.map((swim, i) => {
                    return (
                        <TouchableWithoutFeedback onPress={() => {
                            handleExpandSwimReview(i)
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                        }}
                        key={i}>
                            <View style={styles.swimReviewItem}>
                            <Image style={styles.profileImage} source={{uri: swim.profileImg}}/>
                            <View style={styles.textContainer}>
                                <Text>Nickname: {swim.nickname}</Text>
                                <Text>Notes: {swim.notes}</Text>
                                <Text>stars: {swim.stars}</Text>
                                <Text>date: {swim.date}</Text>
                                <Text style={handleExpandSwimReviewStyle(i)}>See Swimmer's Experience...</Text>
                                {expandReview.includes(i) && (
                                    <>
                                    <Text>recordTemp: {swim.recordTemp}</Text>
                                    <Text>feelTemp: {swim.feelTemp}</Text>
                                    <Text>mins: {swim.mins}</Text>
                                    <Text>outOfDepth: {swim.outOfDepth}</Text>
                                    <Text>shore: {swim.shore}</Text>
                                    <Text>bankAngle: {swim.bankAngle}</Text>
                                    <Text>clarity: {swim.clarity}</Text>
                                    </>
                                )}
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