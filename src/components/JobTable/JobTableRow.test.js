import React from 'react'
import { shallow } from 'enzyme'
import JobTableRow from './JobTableRow'

describe('<JobTableRow>', () => {
    it('renders cron jobs without errors', () => {
        const job = {
            id: '1',
            name: 'Name',
            type: 'SEND_SCHEDULED_MESSAGE',
            cronExpression: '0 0 * ? * *',
            status: 'ENABLED',
            nextExecutionTime: '2100-10-10T14:48:00',
            enabled: true,
            configurable: true,
        }

        shallow(<JobTableRow job={job} />)
    })

    it('renders fixed delay jobs without errors', () => {
        const job = {
            id: '1',
            name: 'Name',
            type: 'CONTINUOUS_ANALYTICS_TABLE',
            status: 'ENABLED',
            nextExecutionTime: '',
            enabled: true,
            delay: 6000,
            configurable: true,
        }

        shallow(<JobTableRow job={job} />)
    })
})
