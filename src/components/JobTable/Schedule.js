import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import translateCron from '../../services/translate-cron'

const Schedule = ({ cronExpression, delay }) => {
    const hasCronExpression = !!cronExpression
    const hasDelay = !!delay

    if (hasCronExpression) {
        return translateCron(cronExpression)
    }

    if (hasDelay) {
        return i18n.t('{{ delay }} seconds after last run', { delay })
    }

    // Unrecognised or invalid type
    return '-'
}

const { string, number } = PropTypes

Schedule.propTypes = {
    cronExpression: string,
    delay: number,
}

export default Schedule
