function validateEmail(email) {

    if (email === null) {
        return "";
    }
    if (email.length === 0) {
        return 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        return 'Email is invalid.';
    } 
    return ""
}

function validateField(value, minLength, maxLength, fieldName) {

    if (value == null) {
        return "";
    }
    if (value.length === 0) {
        return fieldName + " is required."
    }
    if (value.length < minLength) {
        return "The minimum length for " + fieldName + " is " + minLength
    }
    if (value.length > maxLength) {
        return "The maximum length for " + fieldName + " is " + maxLength
    }
    return ""
}

function validateRequired(value, fieldName) {
    if (value === null) {
        return "";
    }
    if (value.length === 0) {
        return fieldName + " is required";
    } 
    return ""
}

export { validateEmail, validateField, validateRequired }



