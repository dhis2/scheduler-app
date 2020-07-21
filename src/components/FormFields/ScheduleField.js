import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { useGetJobTypes, selectors } from '../../hooks/job-types'
import CronField from './CronField'
import DelayField from './DelayField'

const ScheduleField = ({ jobType }) => {
    const { loading, error, data } = useGetJobTypes()

    if (loading) {
        return null
    }

    if (error) {
        /**
         * We need the jobtypes, so throw the error if these
         * can't be loaded.
         */
        throw error
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

const { string } = PropTypes

ScheduleField.propTypes = {
    jobType: string.isRequired,
}

export default ScheduleField
