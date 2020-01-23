const isValidInteger = value => value.match(/^\d+$/)

export default delay => {
    if (!isValidInteger(delay)) {
        return false
    }

    return true
}
