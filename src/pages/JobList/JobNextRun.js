import moment from 'moment'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'

const JobNextRun = ({ nextExecutionTime, enabled }) => {
    if (!enabled || !nextExecutionTime) {
        return '-'
    }

    const now = moment(Date.now())

    /**
     * The recommendation is to run dhis2 on a server set to UTC time.
     * In that case this timestamp is also UTC. If those recommendations
     * weren't followed the time could be off, but there's nothing
     * we can do to detect that.
     */
    const nextRun = moment.utc(nextExecutionTime)
    const nextRunIsInPast = nextRun.isSameOrBefore(now, 'minute')

    /**
     * If the time is in the past, that could mean that the task is running,
     * and the nextExecutionTime hasn't been updated yet.
     */

    if (nextRunIsInPast) {
        return i18n.t('Not scheduled')
    }

    return now.to(nextRun)
}

JobNextRun.propTypes = {
    enabled: PropTypes.bool.isRequired,
    nextExecutionTime: PropTypes.string,
}

export default JobNextRun
