import React from 'react'
import { shallow } from 'enzyme'
import FatalError from './FatalError'

describe('<FatalError>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(
            <FatalError message="Error" details={['Details']} />
        )

        expect(wrapper).toMatchSnapshot()
    })
})
