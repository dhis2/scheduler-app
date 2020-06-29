import React from 'react'
import { shallow } from 'enzyme'
import JobListTable from './JobListTable'

describe('<JobListTable>', () => {
    it('renders without errors when there are jobs', () => {
        const jobIds = ['1', '2']
        const jobEntities = {
            1: {
                cronExpression: '0 0 * ? * *',
                displayName: 'Name',
                enabled: true,
                id: '1',
                jobStatus: 'ENABLED',
                jobType: 'Type',
                nextExecutionTime: '2100-10-10T14:48:00',
                schedulingType: 'CRON',
            },
            2: {
                delay: 6000,
                displayName: 'Name',
                enabled: true,
                id: '2',
                jobStatus: 'ENABLED',
                jobType: 'Type',
                nextExecutionTime: '',
                schedulingType: 'FIXED_DELAY',
            },
        }

        shallow(<JobListTable jobIds={jobIds} jobEntities={jobEntities} />)
    })

    it('renders without errors when there are no jobs', () => {
        const jobIds = []
        const jobEntities = {}

        shallow(<JobListTable jobIds={jobIds} jobEntities={jobEntities} />)
    })
})
