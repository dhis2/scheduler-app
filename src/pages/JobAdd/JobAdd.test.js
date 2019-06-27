import React from 'react'
import { shallow } from 'enzyme'
import JobAdd from './JobAdd'

describe('<JobAdd>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<JobAdd />)

        expect(wrapper).toMatchSnapshot()
    })
})
