import React from 'react'
import { shallow } from 'enzyme'
import { useDataQuery } from '@dhis2/app-runtime'
import { getAuthorized } from './selectors'
import AuthWall from './AuthWall'

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

jest.mock('./selectors', () => ({
    getAuthorized: jest.fn(),
}))

describe('<AuthWall>', () => {
    it('renders a spinner when loading', () => {
        useDataQuery.mockImplementationOnce(() => ({ loading: true }))

        const wrapper = shallow(<AuthWall>Child</AuthWall>)

        expect(wrapper).toMatchSnapshot()
    })

    it('throws fetching errors if they occur', () => {
        const props = { children: 'Child' }
        const error = new Error('Something went wrong')
        useDataQuery.mockImplementationOnce(() => ({
            loading: false,
            error,
        }))

        expect(() => AuthWall(props)).toThrow(error)
    })

    it('redirects unauthorized users', () => {
        useDataQuery.mockImplementationOnce(() => ({
            loading: false,
            error: undefined,
            data: {},
        }))
        getAuthorized.mockImplementationOnce(() => false)

        const wrapper = shallow(<AuthWall>Child</AuthWall>)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders the children for users that are authorized', () => {
        useDataQuery.mockImplementationOnce(() => ({
            loading: false,
            error: undefined,
            data: {},
        }))
        getAuthorized.mockImplementationOnce(() => true)

        const wrapper = shallow(<AuthWall>Child</AuthWall>)

        expect(wrapper).toMatchSnapshot()
    })
})
