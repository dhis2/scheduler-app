import React from 'react'
import { shallow } from 'enzyme'
import LinkButton from './LinkButton'

describe('<LinkButton>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<LinkButton as="a">Link text</LinkButton>)

        expect(wrapper).toMatchSnapshot()
    })

    it('does not pass filtered props to the link', () => {
        const wrapper = shallow(
            <LinkButton primary as="a">
                Link text
            </LinkButton>
        )

        expect(wrapper).toMatchSnapshot()
    })
})
