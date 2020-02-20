import validateCron from './validate-cron'

const requiredCron = value => {
    const isString = typeof value === 'string'
    const isFilled = isString && value.length > 0

    if (!isFilled) {
        return 'A CRON expression is required'
    }

    if (!validateCron(value)) {
        return 'Please enter a valid CRON expression'
    }

    return undefined
}

export default requiredCron
