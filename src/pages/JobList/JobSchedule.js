import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { HumanReadableCron } from '../../components/Cron'

const JobSchedule = ({ cronExpression, schedulingType, delay }) => {
    switch (schedulingType) {
        case 'CRON':
            return <HumanReadableCron cronExpression={cronExpression} />
        case 'FIXED_DELAY':
            return i18n.t('{{ delay }} seconds after last run', { delay })
        default:
            // Unrecognised or invalid type
            return '-'
    }
}

JobSchedule.propTypes = {
    schedulingType: PropTypes.string.isRequired,
    cronExpression: PropTypes.string,
    delay: PropTypes.number,
}

export default JobSchedule
