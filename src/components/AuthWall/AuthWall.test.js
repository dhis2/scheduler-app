import React from 'react'
import { shallow, mount } from 'enzyme'
import { UnconnectedAuthWall as AuthWall } from './AuthWall'

const defaultProps = {
    children: 'Children',
    didFetch: false,
    errorMessage: '',
    isAuthorized: false,
    fetchMeIfNeeded: () => {},
}

describe('<AuthWall>', () => {
    it('renders a spinner when loading', () => {
        const props = { ...defaultProps, didFetch: false }
        const wrapper = shallow(<AuthWall {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders errors if they occur', () => {
        const props = {
            ...defaultProps,
            didFetch: true,
            errorMessage: 'Something went wrong',
        }
        const wrapper = shallow(<AuthWall {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders a message for unauthorized users', () => {
        const props = { ...defaultProps, didFetch: true, isAuthorized: false }
        const wrapper = shallow(<AuthWall {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders the children for authorized users', () => {
        const props = { ...defaultProps, didFetch: true, isAuthorized: true }
        const wrapper = shallow(<AuthWall {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('fetches data on mount', () => {
        const props = { ...defaultProps, fetchMeIfNeeded: jest.fn() }
        mount(<AuthWall {...props} />)

        expect(props.fetchMeIfNeeded).toHaveBeenCalled()
    })
})
