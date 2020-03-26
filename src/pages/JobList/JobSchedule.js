import cronstrue from 'cronstrue'
import { string, number } from 'prop-types'

const JobSchedule = ({ cronExpression, schedulingType, delay }) => {
    switch (schedulingType) {
        case 'CRON':
            return cronstrue.toString(cronExpression)
        case 'FIXED_DELAY':
            return delay + ' seconds after last run'
        default:
            // Unrecognised or invalid type
            return '-'
    }
}

JobSchedule.propTypes = {
    schedulingType: string.isRequired,
    cronExpression: string,
    delay: number,
}

export default JobSchedule
