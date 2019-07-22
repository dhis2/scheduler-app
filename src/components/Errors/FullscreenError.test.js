import React from 'react'
import { shallow } from 'enzyme'
import FullscreenError from './FullscreenError'

describe('<FullscreenError>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(
            <FullscreenError message="Error" details={['Details']} />
        )

        expect(wrapper).toMatchSnapshot()
    })
})
