import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    swimBot: {
        padding: '2%',
        backgroundColor: 'white',
        borderRadius: 20,
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        elevation: 10
    },
    swimBotForecastDatesContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    swimBotForecastDates: {
        backgroundColor: 'white',
        paddingHorizontal: '5%'
    },
    AveUserData: {
        backgroundColor: 'orange'
    },
    summary: {
        backgroundColor: 'pink'
    },
    swimReviewGroup: {
        backgroundColor: 'white'
    },
    swimReviewItem: {
        height: 'auto'
    },
    showContent: {
        opacity:1
    },
    hideContent: {
        opacity: 0,
        height: 0
    },
    profileImage: {
        objectFit: 'contain',
        height: 75,
        width: 75,
        borderRadius: 75,
        backgroundColor: 'black'
    }
})

export const props = {
    KeyboardAvoidingView: {
        behavior: Platform.OS === 'ios' ? 'padding' : 'height',
        keyboardVerticalOffset: Platform.OS === 'ios' ? 0 : -300
    }
}