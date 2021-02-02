import React from 'react'
import { mount } from 'enzyme'
import { useDataQuery } from '@dhis2/app-runtime'
import expectRenderError from '../../../test/expect-render-error'
import JobStore from './JobStore'
import JobContext from './JobContext'

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<JobStore>', () => {
    it('shows a spinner when loading', () => {
        useDataQuery.mockImplementation(() => ({ loading: true }))

        const wrapper = mount(<JobStore>Child</JobStore>)
        const loadingIndicator = wrapper.find({
            'data-test': 'dhis2-uicore-circularloader',
        })

        expect(loadingIndicator).toHaveLength(1)
    })

    it('throws fetching errors if they occur', () => {
        const props = { children: 'Child' }
        const message = 'Something went wrong'
        const error = new Error(message)

        useDataQuery.mockImplementation(() => ({
            loading: false,
            error,
        }))

        expectRenderError(<JobStore {...props} />, message)
    })

    it('renders the children when data has been fetched', () => {
        const refetch = () => 'refetch'
        const jobs = 'jobs'

        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {
                jobs: {
                    jobConfigurations: jobs,
                },
            },
            refetch,
        }))

        const wrapper = mount(
            <JobStore>
                <JobContext.Consumer>
                    {({ refetch, jobs }) => (
                        <span>
                            {refetch()} {jobs}
                        </span>
                    )}
                </JobContext.Consumer>
            </JobStore>
        )

        expect(wrapper.text()).toEqual(expect.stringContaining(refetch()))
        expect(wrapper.text()).toEqual(expect.stringContaining(jobs))
    })
})
