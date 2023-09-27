import { Alert } from "react-native"

function formatDate(strDate, delimiter) {
 let dateSplit = strDate.split(delimiter)
 return dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0]
}

const simpleAlert = () =>
    Alert.alert('Delete Account', 'Failed to delete account', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

function getFirebaseError(error) {
    if (error.code.includes("auth/email-already-in-use")){
        return "Email already in use"
    }
    if (error.code.includes("auth/user-not-found")){
        return "User not found"
    }
    if (error.code.includes("auth/too-many-requests")){
        return "Access to this account has been temporarily disabled due to many failed login attempts."
    }
    if (error.code.includes("auth/wrong-password")){
        return "Wrong password"
    } 
    return ""
}

export {getFirebaseError, formatDate, simpleAlert }
