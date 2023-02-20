import { PropTypes } from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import translateCron from '../../services/translate-cron'

const Schedule = ({ cronExpression, delay }) => {
    const hasCron = !!cronExpression
    const hasDelay = !!delay

    if (hasCron) {
        return translateCron(cronExpression)
    }

    if (hasDelay) {
        return i18n.t('{{ delay }} seconds after last run', { delay })
    }

    return '-'
}

const { string, number } = PropTypes

Schedule.propTypes = {
    cronExpression: string,
    delay: number,
}

export default Schedule
