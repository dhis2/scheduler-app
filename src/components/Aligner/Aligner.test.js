import React from 'react'
import { shallow } from 'enzyme'
import Aligner from './Aligner'

describe('<Aligner>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Aligner>Text</Aligner>)

        expect(wrapper).toMatchSnapshot()
    })

    it('responds to a vertical prop', () => {
        const wrapper = shallow(<Aligner>Text</Aligner>)

        expect(wrapper).toMatchSnapshot()
    })
})
