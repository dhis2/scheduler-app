import validateCron from '../../services/validate-cron'

export const requiredCronExpression = value => {
    const isString = typeof value === 'string'
    const isFilled = isString && value.length > 0

    if (!isFilled) {
        return new Error('CRON expression is required')
    }

    if (!validateCron(value)) {
        return new Error('Needs to be a valid CRON expression')
    }

    return undefined
}

export const requiredString = value => {
    const isString = typeof value === 'string'
    const isFilled = isString && value.length > 0

    if (!isFilled) {
        return new Error('This field is required')
    }

    return undefined
}
