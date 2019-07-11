import React from 'react'
import { shallow } from 'enzyme'
import Push from './Push'

describe('<Push>', () => {
    it('accepts a direction="left" prop', () => {
        const wrapper = shallow(<Push direction="left">Text</Push>)

        expect(wrapper).toMatchSnapshot()
    })

    it('accepts a direction="right" prop', () => {
        const wrapper = shallow(<Push direction="right">Text</Push>)

        expect(wrapper).toMatchSnapshot()
    })

    it('accepts a direction="up" prop', () => {
        const wrapper = shallow(<Push direction="up">Text</Push>)

        expect(wrapper).toMatchSnapshot()
    })

    it('accepts a direction="down" prop', () => {
        const wrapper = shallow(<Push direction="down">Text</Push>)

        expect(wrapper).toMatchSnapshot()
    })
})
