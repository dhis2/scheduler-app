import i18n from '@dhis2/d2-i18n'

const invalidOptionMessage = i18n.t('Please select an option')

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
