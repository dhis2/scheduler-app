import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDataQuery } from '@dhis2/app-runtime'
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
    it('shows a spinner when loading', () => {
        useDataQuery.mockImplementation(() => ({ loading: true }))

        const wrapper = mount(<AuthWall>Child</AuthWall>)
        const loadingIndicator = wrapper.find({
            'data-test': 'dhis2-uicore-circularloader',
        })

        expect(loadingIndicator).toHaveLength(1)
    })

    it('shows a noticebox for fetching errors', () => {
        const message = 'Something went wrong'
        const error = new Error(message)

        useDataQuery.mockImplementation(() => ({
            loading: false,
            error,
        }))

        const wrapper = shallow(<AuthWall>Child</AuthWall>)
        const noticebox = wrapper.find('NoticeBox')

        expect(noticebox).toHaveLength(1)
    })

    it('shows a noticebox for unauthorized users', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {},
        }))
        getAuthorized.mockImplementation(() => false)

        const wrapper = shallow(<AuthWall>Child</AuthWall>)
        const noticebox = wrapper.find('NoticeBox')

        expect(noticebox).toHaveLength(1)
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
