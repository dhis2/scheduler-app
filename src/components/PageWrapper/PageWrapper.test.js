import React from 'react'
import { shallow } from 'enzyme'
import PageWrapper from './PageWrapper'

describe('<PageWrapper>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<PageWrapper>Text</PageWrapper>)

        expect(wrapper).toMatchSnapshot()
    })
})
