import React from 'react'
import { shallow } from 'enzyme'
import { useDataQuery } from '@dhis2/app-runtime'
import AuthWall from './AuthWall'

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

describe('<AuthWall>', () => {
    it('renders a spinner when loading', () => {
        useDataQuery.mockImplementationOnce(() => ({ loading: true }))

        const wrapper = shallow(<AuthWall>Child</AuthWall>)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders errors if they occur', () => {
        useDataQuery.mockImplementationOnce(() => ({
            loading: false,
            error: new Error('Something went wrong'),
        }))

        const wrapper = shallow(<AuthWall>Child</AuthWall>)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders a message for unauthorized users', () => {
        useDataQuery.mockImplementationOnce(() => ({
            loading: false,
            error: false,
            data: {
                me: {
                    authorities: [],
                },
            },
        }))

        const wrapper = shallow(<AuthWall>Child</AuthWall>)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders the children for users with permission ALL', () => {
        useDataQuery.mockImplementationOnce(() => ({
            loading: false,
            error: false,
            data: {
                me: {
                    authorities: ['ALL'],
                },
            },
        }))

        const wrapper = shallow(<AuthWall>Child</AuthWall>)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders the children for users with permission F_SCHEDULING_ADMIN', () => {
        useDataQuery.mockImplementationOnce(() => ({
            loading: false,
            error: false,
            data: {
                me: {
                    authorities: ['F_SCHEDULING_ADMIN'],
                },
            },
        }))

        const wrapper = shallow(<AuthWall>Child</AuthWall>)

        expect(wrapper).toMatchSnapshot()
    })
})
