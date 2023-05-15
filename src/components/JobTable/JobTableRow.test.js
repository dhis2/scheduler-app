import React from 'react'
import { shallow } from 'enzyme'
import JobTableRow from './JobTableRow'

describe('<JobTableRow>', () => {
    it('renders cron jobs without errors', () => {
        const job = {
            id: 'lnWRZN67iDU',
            name: 'Job 1',
            type: 'DATA_INTEGRITY',
            cronExpression: '0 0 3 ? * MON',
            nextExecutionTime: '2021-03-01T03:00:00.000',
            status: 'SCHEDULED',
            enabled: true,
            configurable: true,
            sequence: [
                {
                    id: 'lnWRZN67iDU',
                    name: 'Job 1',
                    type: 'DATA_INTEGRITY',
                    cronExpression: '0 0 3 ? * MON',
                    nextExecutionTime: '2021-03-01T03:00:00.000',
                    status: 'SCHEDULED',
                },
            ],
        }

        shallow(<JobTableRow job={job} refetch={() => {}} />)
    })

    it('renders fixed delay jobs without errors', () => {
        const job = {
            id: 'lnWRZN67iDU',
            name: 'Job 1',
            type: 'CONTINUOUS_ANALYTICS_TABLE',
            delay: 6000,
            nextExecutionTime: '2021-03-01T03:00:00.000',
            status: 'SCHEDULED',
            enabled: true,
            configurable: true,
            sequence: [
                {
                    id: 'lnWRZN67iDU',
                    name: 'Job 1',
                    type: 'CONTINUOUS_ANALYTICS_TABLE',
                    delay: 6000,
                    nextExecutionTime: '2021-03-01T03:00:00.000',
                    status: 'SCHEDULED',
                },
            ],
        }

        shallow(<JobTableRow job={job} refetch={() => {}} />)
    })
})
