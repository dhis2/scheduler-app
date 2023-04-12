import React from 'react'
import { shallow } from 'enzyme'
import JobTable from './JobTable'

describe('<JobTable>', () => {
    it('renders without errors when there are jobs', () => {
        const jobs = [
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

        shallow(<JobTable jobs={jobs} refetch={() => {}} />)
    })

    it('renders without errors when there are no jobs', () => {
        const jobs = []

        shallow(<JobTable jobs={jobs} refetch={() => {}} />)
    })
})
