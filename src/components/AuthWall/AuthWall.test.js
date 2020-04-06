import React from 'react'
import { shallow } from 'enzyme'
import { useGetMe, selectors } from '../../hooks/me'
import AuthWall from './AuthWall'

jest.mock('../../hooks/me', () => ({
    useGetMe: jest.fn(),
    selectors: {
        getAuthorized: jest.fn(),
    },
}))

describe('<AuthWall>', () => {
    it('renders a spinner when loading', () => {
        useGetMe.mockImplementationOnce(() => ({ loading: true }))

        const wrapper = shallow(<AuthWall>Child</AuthWall>)

        expect(wrapper).toMatchSnapshot()
    })

    it('throws fetching errors if they occur', () => {
        const props = { children: 'Child' }
        const error = new Error('Something went wrong')
        useGetMe.mockImplementationOnce(() => ({
            loading: false,
            error,
        }))

        expect(() => AuthWall(props)).toThrow(error)
    })

    it('redirects unauthorized users', () => {
        useGetMe.mockImplementationOnce(() => ({
            loading: false,
            error: undefined,
            data: {},
        }))
        selectors.getAuthorized.mockImplementationOnce(() => false)

        const wrapper = shallow(<AuthWall>Child</AuthWall>)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders the children for users that are authorized', () => {
        useGetMe.mockImplementationOnce(() => ({
            loading: false,
            error: undefined,
            data: {},
        }))
        selectors.getAuthorized.mockImplementationOnce(() => true)

        const wrapper = shallow(<AuthWall>Child</AuthWall>)

        expect(wrapper).toMatchSnapshot()
    })
})
