import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDataQuery } from '@dhis2/app-runtime'
import expectRenderError from '../../../test/expect-render-error'
import JobEditContainer from './JobEditContainer'

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
    useParams: () => ({ id: 'id' }),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<JobEditContainer>', () => {
    it('renders a spinner when loading', () => {
        useDataQuery.mockImplementation(() => ({
            loading: true,
            error: undefined,
            data: null,
        }))

        const wrapper = mount(<JobEditContainer />)

        expect(wrapper.find('CircularLoader').length > 0).toBe(true)
    })

    it('throws errors it encounters during fetching', () => {
        const message = 'Something went wrong'

        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: new Error(message),
            data: null,
        }))

        expectRenderError(<JobEditContainer />, message)
    })

    it('renders without errors when there is data', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {
                job: {
                    name: 'name',
                },
            },
        }))

        shallow(<JobEditContainer />)
    })
})
