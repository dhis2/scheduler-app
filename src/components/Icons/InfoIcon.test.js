import React from 'react'
import { shallow } from 'enzyme'
import InfoIcon from './InfoIcon'

describe('<InfoIcon>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<InfoIcon />)

        expect(wrapper).toMatchSnapshot()
    })
})
