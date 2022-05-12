import i18n from '@dhis2/d2-i18n'
import validateCron from './validate-cron'

const requiredCron = (value) => {
    const isString = typeof value === 'string'
    const isFilled = isString && value.length > 0

    if (!isFilled) {
        return i18n.t('A CRON expression is required')
    }

    if (!validateCron(value)) {
        return i18n.t('Please enter a valid CRON expression')
    }

    return undefined
}

export default requiredCron
