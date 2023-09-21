import { StyleSheet } from "react-native"
import { colours } from "./base"

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
        display: 'flex',
        backgroundColor: colours.bg,
        padding: '1%',
        paddingBottom: 0,
        gap: 10
    },
    title: {
        width: '100%',
        height: 'fit-content',
        backgroundColor: colours.accent2,
        padding: '2%',
        borderRadius: 20,
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        elevation: 10
    },
    title_text: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
        textAlign: "center"
    },
    summary: {
        padding: '2%',
        backgroundColor: 'white',
        borderRadius: 20,
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        elevation: 10
    },
    showContent: {
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