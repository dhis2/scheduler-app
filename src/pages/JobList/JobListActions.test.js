import React from 'react'
import { shallow } from 'enzyme'
import JobListActions from './JobListActions'

describe('<JobListActions>', () => {
    it('renders correctly for configurable jobs', () => {
        const wrapper = shallow(<JobListActions id="1" configurable />)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders correctly for non configurable jobs', () => {
        const wrapper = shallow(<JobListActions id="1" />)

        expect(wrapper).toMatchSnapshot()
    })
})
