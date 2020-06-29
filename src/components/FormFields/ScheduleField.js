import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { useDataQuery } from '@dhis2/app-runtime'
import { getJobTypeObject } from './selectors'
import CronField from './CronField'
import DelayField from './DelayField'

const query = {
    jobTypes: {
        resource: 'jobConfigurations/jobTypes',
    },
}

const ScheduleField = ({ jobType }) => {
    const { loading, error, data } = useDataQuery(query)

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

    const currentJob = getJobTypeObject(data.jobTypes.jobTypes, jobType)
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
