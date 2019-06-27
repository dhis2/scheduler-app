import React from 'react'
import { shallow } from 'enzyme'
import JobEdit from './JobEdit'

describe('<JobEdit>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<JobEdit />)

        expect(wrapper).toMatchSnapshot()
    })
})
