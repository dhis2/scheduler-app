import React from 'react'
import { shallow } from 'enzyme'
import JobView from './JobView'

describe('<JobView>', () => {
    it('renders without errors', () => {
        const job = {
            name: '',
            created: '',
            lastExecutedStatus: '',
            lastExecuted: '',
            jobType: 'DATA_INTEGRITY',
            cronExpression: '',
        }
        const wrapper = shallow(<JobView job={job} />)
        const jobform = wrapper.find('JobDetails')

        expect(jobform).toHaveLength(1)
    })
})
