import React from 'react'
import { shallow } from 'enzyme'
import Info from './Info'

describe('<Info>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Info />)

        expect(wrapper).toMatchSnapshot()
    })
})
