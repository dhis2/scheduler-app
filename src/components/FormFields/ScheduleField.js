import React, { useContext } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { StoreContext, selectors } from '../Store'
import CronField from './CronField'
import DelayField from './DelayField'

const ScheduleField = ({ jobType }) => {
    const store = useContext(StoreContext)
    const currentJob = selectors.getJobType(store, jobType)
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
