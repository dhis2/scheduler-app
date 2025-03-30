import React from 'react'
import { shallow } from 'enzyme'
import JobEdit from './JobEdit'

describe('<JobEdit>', () => {
    it('renders without errors', () => {
        const job = {
            name: '',
            created: '',
            lastExecutedStatus: '',
            lastExecuted: '',
        }
        const wrapper = shallow(<JobEdit job={job} />)
        const jobform = wrapper.find('JobEditFormContainer')

        expect(jobform).toHaveLength(1)
    })
})
