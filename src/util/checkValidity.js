export default function checkValidity(value, rules) {
    let isValid = true;

    if (!rules) return isValid;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;
}
