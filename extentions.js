import { Alert } from "react-native"

function formatDate(strDate, delimiter) {
 let dateSplit = strDate.split(delimiter)
 return dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0]
}

const simpleAlert = (title, msg) =>
    Alert.alert(title, msg, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

const generateGuid =() => {
    return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    }); 
}
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

export {getFirebaseError, formatDate, simpleAlert, generateGuid }
