import React from 'react'
import { shallow } from 'enzyme'
import JobListTable from './JobListTable'

describe('<JobListTable>', () => {
    it('renders correctly when there are jobs', () => {
        const jobIds = ['1']
        const jobEntities = {
            1: {
                id: '1',
                displayName: '',
                jobType: '',
                cronExpression: '',
                jobStatus: '',
                nextExecutionTime: '',
                enabled: true,
            },
        }
        const wrapper = shallow(
            <JobListTable jobIds={jobIds} jobEntities={jobEntities} />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('renders correctly when there are no jobs', () => {
        const jobIds = []
        const jobEntities = {}
        const wrapper = shallow(
            <JobListTable jobIds={jobIds} jobEntities={jobEntities} />
        )

        expect(wrapper).toMatchSnapshot()
    })
})
