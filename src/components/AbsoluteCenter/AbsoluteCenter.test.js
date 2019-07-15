import React from 'react'
import { shallow } from 'enzyme'
import AbsoluteCenter from './AbsoluteCenter'

describe('<AbsoluteCenter>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<AbsoluteCenter>Text</AbsoluteCenter>)

        expect(wrapper).toMatchSnapshot()
    })

    it('responds to a vertical prop', () => {
        const wrapper = shallow(<AbsoluteCenter vertical>Text</AbsoluteCenter>)

        expect(wrapper).toMatchSnapshot()
    })
})
