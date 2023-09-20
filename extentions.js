function formatDate(strDate, delimiter) {
 let dateSplit = strDate.split(delimiter)
 return dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0]
}

function getFirebaseError(error) {
    if (error.code.includes("auth/email-already-in-use")){
        return "Email already in use"
    }
}

export {getFirebaseError, formatDate}
