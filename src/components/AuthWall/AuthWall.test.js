import React from 'react'
import { shallow } from 'enzyme'
import { UnconnectedAuthWall as AuthWall } from './AuthWall'

const defaultProps = {
    children: 'Children',
    isFetching: false,
    errorMessage: '',
    isAuthorized: false,
    fetchMeIfNeeded: () => {},
}

describe('<AuthWall>', () => {
    it('renders a spinner when loading', () => {
        const props = { ...defaultProps, isFetching: true }
        const wrapper = shallow(<AuthWall {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders errors if they occur', () => {
        const props = { ...defaultProps, errorMessage: 'Something went wrong' }
        const wrapper = shallow(<AuthWall {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders a message for unauthorized users', () => {
        const props = { ...defaultProps, isAuthorized: false }
        const wrapper = shallow(<AuthWall {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders the children for authorized users', () => {
        const props = { ...defaultProps, isAuthorized: true }
        const wrapper = shallow(<AuthWall {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('fetches data on mount', () => {
        const props = { ...defaultProps, fetchMeIfNeeded: jest.fn() }
        const wrapper = shallow(<AuthWall {...props} />)

        expect(props.fetchMeIfNeeded).toHaveBeenCalled()
    })
})
