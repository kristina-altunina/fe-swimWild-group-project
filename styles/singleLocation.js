import { StyleSheet } from "react-native"
import { colours } from "../styles/base";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    KeyboardAvoidingView: {
        flex: 1
    },
    screen: {
        width: '100%',
        height: 'auto'
    },
    display: {
        flex: 1,
        backgroundColor: 'black',
        display: 'flex',
        backgroundColor: 'red', //delete after,
        padding: '1%',
        paddingBottom: 0
    },
    title: {
        width: '100%',
        height: 'fit-content',
        backgroundColor: 'green',
        padding: '1%'       
    },
    title_text: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    swimBot: {
        backgroundColor: 'blue'
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