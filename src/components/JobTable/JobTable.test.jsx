import React from 'react'
import { shallow } from 'enzyme'
import JobTable from './JobTable'

describe('<JobTable>', () => {
    it('renders without errors when there are jobs or queues', () => {
        const jobsAndQueues = [
            {
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
            },
        ]

        shallow(<JobTable jobsAndQueues={jobsAndQueues} refetch={() => {}} />)
    })

    it('renders without errors when there are no jobs or queues', () => {
        const jobsAndQueues = []

        shallow(<JobTable jobsAndQueues={jobsAndQueues} refetch={() => {}} />)
    })
})
