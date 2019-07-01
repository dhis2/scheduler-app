import React from 'react'
import { shallow } from 'enzyme'
import Title from './Title'

describe('<Title>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Title>Text</Title>)

        expect(wrapper).toMatchSnapshot()
    })
})
