import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDataQuery } from '@dhis2/app-runtime'
import expectRenderError from '../../../test/expect-render-error'
import JobList from './JobList'
import JobListContainer from './JobListContainer'

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

jest.mock('./JobList', () => jest.fn())

afterEach(() => {
    jest.resetAllMocks()
})

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

        expect(content).toEqual(expect.stringContaining('Loading jobs'))
        expect(wrapper.find('CircularLoader')).toHaveLength(1)
    })

    it('throws errors it encounters during fetching', () => {
        const message = 'Something went wrong'

        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: new Error(message),
            data: null,
        }))

        expectRenderError(<JobListContainer />, message)
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
    })

    it('omits system job ids by default', () => {
        const JobListMock = () => null

        JobList.mockImplementation(JobListMock)
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {
                jobs: {
                    jobConfigurations: [
                        { id: 'user', name: 'user', configurable: true },
                        { id: 'system', name: 'system' },
                    ],
                },
            },
        }))

        const wrapper = mount(<JobListContainer />)
        const childProps = wrapper.children().props()

        expect(childProps.jobIds).toHaveLength(1)
        expect(childProps.jobIds).toEqual(expect.arrayContaining(['user']))
    })

    it('passes system and user job ids after toggling', () => {
        // eslint-disable-next-line react/prop-types
        const JobListMock = ({ showSystemJobs, setShowSystemJobs }) => (
            <button
                data-test="mock-toggle"
                onClick={() => setShowSystemJobs(!showSystemJobs)}
            />
        )

        JobList.mockImplementation(JobListMock)
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {
                jobs: {
                    jobConfigurations: [
                        { id: 'user', name: 'user', configurable: true },
                        { id: 'system', name: 'system' },
                    ],
                },
            },
        }))

        const wrapper = mount(<JobListContainer />)

        wrapper.find({ 'data-test': 'mock-toggle' }).simulate('click')

        const childProps = wrapper.children().props()

        expect(childProps.jobIds).toHaveLength(2)
        expect(childProps.jobIds).toEqual(expect.arrayContaining(['system']))
    })

    it('filters jobs ids after updating the filter', () => {
        // eslint-disable-next-line react/prop-types
        const JobListMock = ({ setJobFilter }) => (
            <input
                data-test="mock-input"
                onChange={e => setJobFilter(e.target.value)}
            />
        )

        JobList.mockImplementation(JobListMock)
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {
                jobs: {
                    jobConfigurations: [
                        { id: 'one', name: 'one', configurable: true },
                        { id: 'two', name: 'two', configurable: true },
                        { id: 'three', name: 'three', configurable: true },
                    ],
                },
            },
        }))

        const wrapper = mount(<JobListContainer />)

        wrapper
            .find({ 'data-test': 'mock-input' })
            .simulate('change', { target: { value: 'three' } })

        const childProps = wrapper.children().props()

        expect(childProps.jobIds).toHaveLength(1)
        expect(childProps.jobIds).toEqual(expect.arrayContaining(['three']))
    })
})
