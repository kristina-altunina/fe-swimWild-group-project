import { StyleSheet } from "react-native"
import { colours } from "./base"

export const styles = StyleSheet.create({
    displayText: {
        color: 'white'
    },
    exclamationMarkIcon: {
        height: 100,
        width: 100
    },
    expandedDataContainer: {
        display: 'flex',
        gap: 2,
        padding: '2%',
        opacity: 0.8,
        borderRadius: 20,
        elevation: 15,
        backgroundColor: colours.accent2,
        borderStyle: 'solid',
        borderWidth: 0.5
    },
    expandedDataText: {
        color: 'white'
    },
    forecastDates: {
        backgroundColor: colours.accent4,
        paddingHorizontal: '2%',
        borderRadius: 10,
        color: 'white',
        opacity: 0.6
    },
    forecastDatesContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        color: 'white',
        padding: '1%',
        gap: 15
    },
    hideContent: {
        opacity: 0,
        height: 0
    },
    highlightText: {
        color: 'rgb(139, 83, 190)'
    },
    popupContainer: {
        display: 'flex',
        flexBasis: 'auto',
        width: '60%',
        backgroundColor: colours.accent2,
        alignItems: 'center',
        padding: '5%',
        borderRadius: 20,
        gap: 10,
        marginTop: '50%'
    },
    popupContainerSetup: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'rgba(225, 225, 225, 0.8)',
        alignItems: 'center'
    },
    popupTitle: {
        color: 'white',
        fontSize: 20
    },
    popupDetails: {
        color: 'white'
    },
    selectedForecastDate: {
        backgroundColor: colours.accent4,
        paddingHorizontal: '5%',
        borderRadius: 10,
        color: 'rgb(139, 83, 190)'
    },
    swimBot: {
        padding: '2%',
        backgroundColor: colours.accent2,
        borderRadius: 20,
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        elevation: 10,
        display: 'flex',
        gap: 2,
    },
    showContent: {
        opacity:1
    },
    textWithInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 25,
        textAlign: "center",
        color: 'white'
    }
})