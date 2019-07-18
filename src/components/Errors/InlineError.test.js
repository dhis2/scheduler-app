import React from 'react'
import { shallow } from 'enzyme'
import InlineError from './InlineError'

describe('<InlineError>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(
            <InlineError message="Error" details={['Details']} />
        )

        expect(wrapper).toMatchSnapshot()
    })
})
