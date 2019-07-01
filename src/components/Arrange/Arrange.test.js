import React from 'react'
import { shallow } from 'enzyme'
import Arrange from './Arrange'

describe('<Arrange>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Arrange>Text</Arrange>)

        expect(wrapper).toMatchSnapshot()
    })
})
