import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    AveUserData: {
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