import { StyleSheet } from "react-native"
import { colours } from "./base"

export const styles = StyleSheet.create({
    swimReviewGroup: {
        padding: '2%',
        display: 'flex',
        gap: 10
    },
    titleText: {
        fontSize: 20,
        color: '#84878d',
        textShadowColor: '#b3b5b8',
        textShadowOffset:{width: 10, height: 10},
        textShadowRadius:20,
    },
    starRatingDisplay: {
        display: 'flex',
        flexDirection: 'row',
        gap: 3
    },
    swimReviewItem: {
        padding: '2%',
        backgroundColor: 'white',
        height: 'auto',
        borderRadius: 20,
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        elevation: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        width: 'auto'
    },
    textContainer: {
        flex: 1,
    },
    nickname: {

    },
    notes: {
        padding: '3%'
    },
    stars: {

    },
    showContent: {
        color: 'rgb(139, 83, 190)',
        opacity:1
    },
    hideContent: {
        opacity: 0,
        height: 0
    },
    profileImage: {
        objectFit: 'contain',
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: 'black'
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export const props = {
    KeyboardAvoidingView: {
        behavior: Platform.OS === 'ios' ? 'padding' : 'height',
        keyboardVerticalOffset: Platform.OS === 'ios' ? 0 : -300
    }
}