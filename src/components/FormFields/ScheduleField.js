import React from 'react'
import { string } from 'prop-types'
import { useGetJobTypes, selectors } from '../../hooks/job-types'
import CronField from './CronField'
import DelayField from './DelayField'

const ScheduleField = ({ jobType }) => {
    const { loading, error, data } = useGetJobTypes()

    if (loading) {
        return <span>Loading job types</span>
    }

    if (error) {
        return <span>{error.message}</span>
    }

    const currentJob = selectors.getJobTypeObject(data, jobType)
    const schedulingType = currentJob.schedulingType

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

ScheduleField.propTypes = {
    jobType: string.isRequired,
}

export default ScheduleField
