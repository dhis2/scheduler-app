import React from 'react'
import { shallow } from 'enzyme'
import CssVariables from './CssVariables'

describe('<CssVariables>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<CssVariables />)

        expect(wrapper).toMatchSnapshot()
    })
})
