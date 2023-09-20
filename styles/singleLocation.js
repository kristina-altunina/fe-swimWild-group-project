import { StyleSheet } from "react-native"
import { colours } from "../styles/base";

export const styles = StyleSheet.create({
    KeyboardAvoidingView: {
        flex: 1
    },
    screen: {
        flex: 1
    },
    display: {
        flex: 1,
        backgroundColor: 'black',
        display: 'flex',
        backgroundColor: 'red', //delete after,
        padding: '1%'
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
        flex: 2,
        backgroundColor: 'blue'
    },
    AveUserData: {
        flex: 1,
        backgroundColor: 'orange'
    },
    summary: {
        flex: 1,
        backgroundColor: 'pink'
    },
    swimPreviewGroup: {
        height: '30%',
        backgroundColor: 'white'
    },
    swimPreviewItem: {
        flex: 1
    }
})

export const props = {
    KeyboardAvoidingView: {
        behavior: Platform.OS === 'ios' ? 'padding' : 'height',
        keyboardVerticalOffset: Platform.OS === 'ios' ? 0 : -300
    }
}