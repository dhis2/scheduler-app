import moment from 'moment'
import { useTimeZoneConversion } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Tooltip } from '@dhis2/ui'
import React from 'react'

const formatDate = (dhis2Date) =>
    `${dhis2Date
        .getServerZonedISOString()
        .substring(0, 19)
        .split('T')
        .join(' ')} (${dhis2Date.serverTimezone})`

const NextRun = ({ nextExecutionTime, enabled }) => {
    const { fromServerDate } = useTimeZoneConversion()

    if (!enabled || !nextExecutionTime) {
        return '-'
    }

    const now = Date.now()

    /**
     * Adjust for client/sever time zone difference.
     */
    const nextRun = fromServerDate(nextExecutionTime)
    const nextRunIsInPast = nextRun.getTime() <= now

    /**
     * If the nextExecutionTime is in the past that means that
     * the scheduled execution time has passed, but the allowed
     * startup delay hasn't expired yet. Effectively this means
     * that the backend will start the job as soon as possible.
     *
     * If the window expires before the job can execute the
     * nextExecutionTime will be updated to a time in the future.
     */

    if (nextRunIsInPast) {
        return i18n.t('Now')
    }

    return (
        <Tooltip content={moment(nextRun).fromNow()}>
            {formatDate(nextRun)}
        </Tooltip>
    )
}

const { bool, string } = PropTypes

NextRun.propTypes = {
    enabled: bool.isRequired,
    nextExecutionTime: string,
}

export default NextRun
