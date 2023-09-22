import { StyleSheet } from "react-native"
import { colours } from "./base"

export const styles = StyleSheet.create({
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
    titleText: {
        fontSize: 25,
        textAlign: "center",
        color: 'white'
    },
    displayText: {
        color: 'white'
    },
    highlightText: {
        color: 'rgb(139, 83, 190)'
    },
    forecastDatesContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        color: 'white',
        padding: '1%',
        gap: 15
    },
    forecastDates: {
        backgroundColor: colours.accent4,
        paddingHorizontal: '2%',
        borderRadius: 10,
        color: 'white',
        opacity: 0.6
    },
    selectedForecastDate: {
        backgroundColor: colours.accent4,
        paddingHorizontal: '5%',
        borderRadius: 10,
        color: 'rgb(139, 83, 190)'
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
    showContent: {
        opacity:1
    },
    hideContent: {
        opacity: 0,
        height: 0
    }
})