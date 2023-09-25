import { StyleSheet } from "react-native"
import { colours } from "./base"

export const styles = StyleSheet.create({
    textWithInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems:'center'
    },
    infoData: {
        padding: '2%',
        backgroundColor: 'white',
        borderRadius: 20,
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        elevation: 10,
        backgroundColor: colours.accent2,
        display: 'flex',
        gap: 10
    },
    titleText: {
        fontSize: 25,
        textAlign: "center",
        color: 'white'
    },
    displayText: {
        color: 'white'
    }
})
