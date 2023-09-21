import { useState } from "react"
import { View, TouchableWithoutFeedback, Text, Image } from "react-native"
import { styles } from "../../styles/swimReviewData"

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

    function handleExpandSwimReviewStyle(i, ele) {
        if(expandReview.includes(i)) {
            if(ele === 'view') return styles.showContent
            if(ele === 'text') return styles.hideContent 
        } else {
            if(ele === 'view') return styles.hideContent
            if(ele === 'text') return styles.showContent
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
                        <Image style={styles.profileImage} source={{uri: swim.profileImg}}/>
                        <View style={styles.textContainer}>
                            <Text>Nickname: {swim.nickname}</Text>
                            <Text>Notes: {swim.notes}</Text>
                            <Text>stars: {swim.stars}</Text>
                            <Text>date: {swim.date}</Text>
                            <Text style={handleExpandSwimReviewStyle(i, 'text')}>See Swimmer's Experience...</Text>
                            <View style={handleExpandSwimReviewStyle(i, 'view')}>
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