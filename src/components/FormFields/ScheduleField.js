import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { useJobType } from '../../hooks/job-types'
import CronField from './CronField'
import DelayField from './DelayField'

const ScheduleField = ({ jobType }) => {
    const { loading, error, data } = useJobType(jobType)

    if (loading) {
        return null
    }

    if (error) {
        throw error
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
