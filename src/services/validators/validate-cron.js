const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const MONTHS = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
]

const isValidFields = (fields) => fields && fields.length === 6
const isValidNumber = (number, x, y) => number >= x && number <= y
const isWildcard = (field) => field === '*'
const isUndefined = (field) => field === '?'

const isValidNumberRange = (range, x, y) => {
    const boundaries = range.split('-')
    if (!boundaries || boundaries.length !== 2) {
        return false
    }

    return (
        isValidNumber(boundaries[0], x, y) &&
        isValidNumber(boundaries[1], x, y) &&
        boundaries[0] <= boundaries[1]
    )
}

const isValidFraction = (fraction, x, y) => {
    const components = fraction.split('/')
    if (!components || components.length !== 2) {
        return false
    }

    /* istanbul ignore next */
    return (
        (isWildcard(components[0]) ||
            isValidNumber(components[0], x, y) ||
            isValidNumberRange(components[0], x, y)) &&
        isValidNumber(components[1], x, y)
    )
}

const isAlphabeticWeekday = (field) => {
    const weekdays = field.split('-')
    const [firstDay, secondDay] = weekdays.map((c) => WEEKDAYS.indexOf(c))
    return (
        (firstDay !== -1 && secondDay === undefined) ||
        (firstDay !== -1 && secondDay !== -1 && firstDay <= secondDay)
    )
}

const isAlphabeticMonth = (field) => {
    const months = field.split('-')
    const [firstMonth, secondMonth] = months.map((m) => MONTHS.indexOf(m))

    /* istanbul ignore next */
    return (
        (firstMonth !== -1 && secondMonth === undefined) ||
        (firstMonth !== -1 && secondMonth !== -1 && firstMonth <= secondMonth)
    )
}

const isValidWithinRange = (field, x, y) =>
    isWildcard(field) ||
    isValidNumber(field, x, y) ||
    isValidNumberRange(field, x, y) ||
    isValidFraction(field, x, y)

const isValidSecondField = (field) => isValidWithinRange(field, 0, 59)
const isValidMinuteField = (field) => isValidWithinRange(field, 0, 59)
const isValidHourField = (field) => isValidWithinRange(field, 0, 23)
const isValidDayField = (field) =>
    isValidWithinRange(field, 0, 31) || isUndefined(field)
const isValidMonthField = (field) =>
    isValidWithinRange(field, 1, 12) || isAlphabeticMonth(field)
const isValidWeekdayField = (field) =>
    isValidWithinRange(field, 1, 7) ||
    isAlphabeticWeekday(field) ||
    isUndefined(field)

/**
 * Cron expression validation. Validates the Spring Scheduling pattern.
 * Format: <second> <minute> <hour> <day-of-month> <month> <day-of-week>
 * Source code: https://git.io/vpoqG
 * Documentation: https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/scheduling/support/CronSequenceGenerator.html
 *
 * @TODO: evaluate if the following is possible
 * There's a npm library called `cron-validate`. It'd need to be configured to
 * accept the quartz job scheduler syntax, it can't be used as a drop-in
 * replacement! https://dhis2.atlassian.net/browse/TECH-1474
 */

const validateCron = (exp) => {
    if (!exp) {
        return false
    }

    const fields = exp.trim().split(' ')

    if (!isValidFields(fields)) {
        return false
    }

    return (
        isValidSecondField(fields[0]) &&
        isValidMinuteField(fields[1]) &&
        isValidHourField(fields[2]) &&
        isValidDayField(fields[3]) &&
        isValidMonthField(fields[4]) &&
        isValidWeekdayField(fields[5])
    )
}

export default validateCron
