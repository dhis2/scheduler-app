import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import { useJobType } from '../../hooks/job-types'
import CronField from './CronField'
import DelayField from './DelayField'

const ScheduleField = ({ jobType }) => {
    const { loading, error, data } = useJobType(jobType)

    if (loading) {
        return null
    }

    if (error) {
        return (
            <NoticeBox
                error
                title={i18n.t(
                    'There was a problem fetching the required job type'
                )}
            />
        )
    }

    const { schedulingType } = data

    switch (schedulingType) {
        case 'CRON':
            return <CronField />
        case 'FIXED_DELAY':
            return <DelayField />
        default:
            // Unrecognised scheduling type
            return null
    }
}

const { string } = PropTypes

ScheduleField.propTypes = {
    jobType: string.isRequired,
}

export default ScheduleField
