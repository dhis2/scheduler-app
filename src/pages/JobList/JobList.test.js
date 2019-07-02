import React from 'react'
import { shallow } from 'enzyme'
import JobList from './JobList'

describe('<JobList>', () => {
    it('renders correctly', () => {
        const jobs = [
            {
                id: 'id',
                displayName: 'name',
            },
        ]
        const wrapper = shallow(<JobList jobs={jobs} />)

        expect(wrapper).toMatchSnapshot()
    })
})
