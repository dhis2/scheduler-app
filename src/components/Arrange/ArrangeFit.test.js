import React from 'react'
import { shallow } from 'enzyme'
import ArrangeFit from './ArrangeFit'

describe('<ArrangeFit>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<ArrangeFit>Text</ArrangeFit>)

        expect(wrapper).toMatchSnapshot()
    })
})
