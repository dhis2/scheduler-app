import React from 'react'
import { shallow } from 'enzyme'
import JobTableRow from './JobTableRow'

describe('<JobTableRow>', () => {
    it('renders cron jobs without errors', () => {
        const job = {
            id: '1',
            displayName: 'Name',
            jobType: 'SEND_SCHEDULED_MESSAGE',
            cronExpression: '0 0 * ? * *',
            jobStatus: 'ENABLED',
            nextExecutionTime: '2100-10-10T14:48:00',
            enabled: true,
            schedulingType: 'CRON',
            configurable: true,
        }

        shallow(<JobTableRow job={job} />)
    })

    it('renders fixed delay jobs without errors', () => {
        const job = {
            id: '1',
            displayName: 'Name',
            jobType: 'CONTINUOUS_ANALYTICS_TABLE',
            jobStatus: 'ENABLED',
            nextExecutionTime: '',
            enabled: true,
            schedulingType: 'FIXED_DELAY',
            delay: 6000,
            configurable: true,
        }

        shallow(<JobTableRow job={job} />)
    })
})
