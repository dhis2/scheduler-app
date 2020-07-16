import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDataQuery } from '@dhis2/app-runtime'
import expectRenderError from '../../../test/expect-render-error'
import JobListContainer from './JobListContainer'

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

jest.mock('./JobList', () => () => null)

describe('<JobListContainer>', () => {
    it('renders a spinner when loading', () => {
        useDataQuery.mockImplementation(() => ({
            loading: true,
            error: undefined,
            data: null,
        }))

        const wrapper = mount(<JobListContainer />)
        const content = wrapper
            .find({ 'data-test': 'dhis2-uicore-centeredcontent' })
            .text()

        expect(content.includes('Loading jobs')).toBe(true)
        expect(wrapper.find('CircularLoader').length > 0).toBe(true)

        useDataQuery.mockReset()
        wrapper.unmount()
    })

    it('throws errors it encounters during fetching', () => {
        const message = 'Something went wrong'

        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: new Error(message),
            data: null,
        }))

        expectRenderError(<JobListContainer />, message)

        useDataQuery.mockReset()
    })

    it('renders without errors when there is data', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {
                jobs: {
                    jobConfigurations: [
                        { id: 'one', name: 'one' },
                        { id: 'two', name: 'two' },
                    ],
                },
            },
        }))

        shallow(<JobListContainer />)
        useDataQuery.mockReset()
    })
})
