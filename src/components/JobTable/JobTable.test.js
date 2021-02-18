import React from 'react'
import { shallow } from 'enzyme'
import JobTable from './JobTable'

describe('<JobTable>', () => {
    it('renders without errors when there are jobs', () => {
        const jobs = [
            {
                cronExpression: '0 0 * ? * *',
                displayName: 'Name',
                enabled: true,
                id: '1',
                jobStatus: 'ENABLED',
                jobType: 'Type',
                nextExecutionTime: '2100-10-10T14:48:00',
                schedulingType: 'CRON',
            },
            {
                delay: 6000,
                displayName: 'Name',
                enabled: true,
                id: '2',
                jobStatus: 'ENABLED',
                jobType: 'Type',
                nextExecutionTime: '',
                schedulingType: 'FIXED_DELAY',
            },
        ]

        shallow(<JobTable jobs={jobs} />)
    })

    it('renders without errors when there are no jobs', () => {
        const jobs = []

        shallow(<JobTable jobs={jobs} />)
    })
})
