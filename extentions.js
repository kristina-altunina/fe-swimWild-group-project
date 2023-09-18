function pad(number) {
    return number < 10 ? "0" + number.toString() : number.toString();
}

function formatDate(strDate, delimiter) {
 let dateSplit = strDate.split(delimiter)
 return dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0]
}

export {pad, formatDate}
