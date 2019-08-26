import React from 'react'
import { shallow } from 'enzyme'
import ArrangeFill from './ArrangeFill'

describe('<ArrangeFill>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<ArrangeFill>Text</ArrangeFill>)

        expect(wrapper).toMatchSnapshot()
    })
})
