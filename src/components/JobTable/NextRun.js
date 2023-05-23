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
     * If the time is in the past, that could mean that the task is running,
     * and the nextExecutionTime hasn't been updated yet.
     */

    if (nextRunIsInPast) {
        return i18n.t('Not scheduled')
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
