const requiredString = value => {
    const isString = typeof value === 'string'
    const isFilled = isString && value.length > 0

    if (!isFilled) {
        return new Error('This field is required')
    }

    return undefined
}

export default requiredString
