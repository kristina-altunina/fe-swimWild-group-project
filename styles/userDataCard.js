import { StyleSheet } from "react-native"
import { colours } from "./base"

export const styles = StyleSheet.create({
    AveUserData: {
        padding: '2%',
        backgroundColor: 'white',
        borderRadius: 20,
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        elevation: 10,
        backgroundColor: colours.accent2,
        display: 'flex',
        gap: 2
    },
    titleText: {
        fontSize: 25,
        textAlign: "center",
        color: 'white'
    },
    displayText: {
        color: 'white'
    },
    expandedData: {
        display: 'flex',
        gap: 2
    },
    showContent: {
        color: 'rgb(139, 83, 190)',
        opacity:1
    },
    hideContent: {
        opacity: 0,
        height: 0
    }
})

export const props = {
    KeyboardAvoidingView: {
        behavior: Platform.OS === 'ios' ? 'padding' : 'height',
        keyboardVerticalOffset: Platform.OS === 'ios' ? 0 : -300
    }
}