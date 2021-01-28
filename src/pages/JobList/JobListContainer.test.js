import React from 'react'
import { shallow, mount } from 'enzyme'
import { JobContext } from '../../components/JobStore'
import JobList from './JobList'
import JobListContainer from './JobListContainer'

jest.mock('./JobList', () => jest.fn())

afterEach(() => {
    jest.resetAllMocks()
})

describe('<JobListContainer>', () => {
    it('renders without errors when there is data', () => {
        const jobs = [
            { id: 'one', name: 'one' },
            { id: 'two', name: 'two' },
        ]

        shallow(
            <JobContext.Provider value={{ jobs }}>
                <JobListContainer />
            </JobContext.Provider>
        )
    })

    it('omits system job ids by default', () => {
        JobList.mockImplementation(() => null)

        const jobs = [
            { id: 'user', name: 'user', configurable: true },
            { id: 'system', name: 'system' },
        ]

        const wrapper = mount(
            <JobContext.Provider value={{ jobs }}>
                <JobListContainer />
            </JobContext.Provider>
        )
        const childProps = wrapper.children().props()

        expect(childProps.jobIds).toHaveLength(1)
        expect(childProps.jobIds).toEqual(expect.arrayContaining(['user']))
    })

    it('passes system and user job ids after toggling', () => {
        JobList.mockImplementation(({ showSystemJobs, setShowSystemJobs }) => (
            <button
                data-test="mock-toggle"
                onClick={() => setShowSystemJobs(!showSystemJobs)}
            />
        ))

        const jobs = [
            { id: 'user', name: 'user', configurable: true },
            { id: 'system', name: 'system' },
        ]

        const wrapper = mount(
            <JobContext.Provider value={{ jobs }}>
                <JobListContainer />
            </JobContext.Provider>
        )

        wrapper.find({ 'data-test': 'mock-toggle' }).simulate('click')

        const childProps = wrapper.children().props()

        expect(childProps.jobIds).toHaveLength(2)
        expect(childProps.jobIds).toEqual(expect.arrayContaining(['system']))
    })

    it('filters jobs ids after updating the filter', () => {
        JobList.mockImplementation(({ setJobFilter }) => (
            <input
                data-test="mock-input"
                onChange={e => setJobFilter(e.target.value)}
            />
        ))

        const jobs = [
            { id: 'one', name: 'one', configurable: true },
            { id: 'two', name: 'two', configurable: true },
            { id: 'three', name: 'three', configurable: true },
        ]

        const wrapper = mount(
            <JobContext.Provider value={{ jobs }}>
                <JobListContainer />
            </JobContext.Provider>
        )

        wrapper
            .find({ 'data-test': 'mock-input' })
            .simulate('change', { target: { value: 'three' } })

        const childProps = wrapper.children().props()

        expect(childProps.jobIds).toHaveLength(1)
        expect(childProps.jobIds).toEqual(expect.arrayContaining(['three']))
    })
})
