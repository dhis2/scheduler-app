const invalidOptionMessage = 'Please select an option'

const requiredSingleSelectOption = value => {
    const isObject = typeof value === 'object'

    if (!isObject) {
        return invalidOptionMessage
    }

    const hasValue = 'value' in value
    const hasLabel = 'label' in value

    if (!hasValue || !hasLabel) {
        return invalidOptionMessage
    }

    return undefined
}

export default requiredSingleSelectOption
