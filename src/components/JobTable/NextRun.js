import moment from 'moment'
import { useTimeZoneConversion } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Tooltip } from '@dhis2/ui'
import React from 'react'

const dateToServerTimeString = (dhis2Date) => {
    const serverTime = dhis2Date
        .getServerZonedISOString()
        .substring(0, 19)
        .split('T')
        .join(' ')
    const serverTZ = dhis2Date.serverTimezone

    return `${serverTime} (${serverTZ})`
}

const NextRun = ({ nextExecutionTime, enabled }) => {
    const { fromServerDate } = useTimeZoneConversion()

    if (!enabled || !nextExecutionTime) {
        return '-'
    }

    const now = Date.now()

    /**
     * nextExecutionTime does not have timezone information. With
     * fromServerDate we return an extended Date object that
     * assumes the timestamp refers to server time and parses the
     * nextExecutionTime to the user's local timezone.
     */
    const nextExecutionDate = fromServerDate(nextExecutionTime)

    /**
     * If the nextExecutionTime is in the past that means that
     * the scheduled execution time has passed, but the allowed
     * startup delay hasn't expired yet. Effectively this means
     * that the backend will start the job as soon as possible.
     *
     * If the window expires before the job can execute the
     * nextExecutionTime will be updated to a time in the future.
     */

    const nextRunIsInPast = nextExecutionDate.getTime() <= now

    if (nextRunIsInPast) {
        return i18n.t('Now')
    }

    return (
        <Tooltip content={dateToServerTimeString(nextExecutionDate)}>
            {moment(nextExecutionDate).fromNow()}
        </Tooltip>
    )
}

const { bool, string } = PropTypes

NextRun.propTypes = {
    enabled: bool.isRequired,
    nextExecutionTime: string,
}

export default NextRun
