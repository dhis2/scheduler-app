import React from 'react'
import { shallow } from 'enzyme'
import JobTable from './JobTable'

describe('<JobTable>', () => {
    it('renders without errors when there are jobs', () => {
        const jobs = [
            {
                cronExpression: '0 0 * ? * *',
                name: 'Name',
                enabled: true,
                id: '1',
                status: 'ENABLED',
                type: 'Type',
                nextExecutionTime: '2100-10-10T14:48:00',
            },
            {
                delay: 6000,
                name: 'Name',
                enabled: true,
                id: '2',
                status: 'ENABLED',
                type: 'Type',
                nextExecutionTime: '',
            },
        ]

        shallow(<JobTable jobs={jobs} />)
    })

    it('renders without errors when there are no jobs', () => {
        const jobs = []

        shallow(<JobTable jobs={jobs} />)
    })
})
