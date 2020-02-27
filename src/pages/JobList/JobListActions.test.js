import React from 'react'
import { shallow } from 'enzyme'
import JobListActions from './JobListActions'

describe('<JobListActions>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<JobListActions id="1" />)

        expect(wrapper).toMatchSnapshot()
    })
})
