import { useState } from "react"
import { View, TouchableWithoutFeedback, Text, Image } from "react-native"
import { styles } from "../../styles/singleLocation"

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
            return styles.showContent
        } else {
            return styles.hideContent
        }
    }

    return (
        <>
        <View style={styles.swimReviewGroup}>
        {
            swimsData.map((swim, i) => {
                return (
                    <TouchableWithoutFeedback onPress={() => handleExpandSwimReview(i)} key={i}>
                        <View style={styles.swimReviewItem}>
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
        </>
    )
}