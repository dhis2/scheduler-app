import React from 'react'
import { shallow } from 'enzyme'
import JobList from './JobList'

describe('<JobList>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<JobList />)

        expect(wrapper).toMatchSnapshot()
    })
})
