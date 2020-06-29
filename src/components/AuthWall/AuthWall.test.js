import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDataQuery } from '@dhis2/app-runtime'
import expectRenderError from '../../../test/expect-render-error'
import { getAuthorized } from './selectors'
import AuthWall from './AuthWall'

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

jest.mock('./selectors', () => ({
    getAuthorized: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<AuthWall>', () => {
    it('shows a loading message when loading', () => {
        useDataQuery.mockImplementation(() => ({ loading: true }))

        const wrapper = mount(<AuthWall>Child</AuthWall>)
        const loadingIndicator = wrapper.find({
            'data-test': 'dhis2-uicore-circularloader',
        })

        expect(loadingIndicator).toHaveLength(1)
        expect(wrapper.text()).toEqual(
            expect.stringContaining('Checking permissions')
        )
    })

    it('throws fetching errors if they occur', () => {
        const props = { children: 'Child' }
        const message = 'Something went wrong'
        const error = new Error(message)

        useDataQuery.mockImplementation(() => ({
            loading: false,
            error,
        }))

        expectRenderError(<AuthWall {...props} />, message)
    })

    it('redirects unauthorized users to /notauthorized', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {},
        }))
        getAuthorized.mockImplementation(() => false)

        const wrapper = shallow(<AuthWall>Child</AuthWall>)
        const redirect = wrapper.find('Redirect')
        const props = redirect.props()

        expect(redirect).toHaveLength(1)
        expect(props).toEqual(expect.objectContaining({ to: '/notauthorized' }))
    })

    it('renders the children for users that are authorized', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {},
        }))
        getAuthorized.mockImplementation(() => true)

        const wrapper = shallow(<AuthWall>Child</AuthWall>)

        expect(wrapper.text()).toEqual(expect.stringContaining('Child'))
    })
})
