import React from 'react'
import { shallow, mount } from 'enzyme'
import { StoreContext } from '../../components/Store'
import JobList from './JobList'
import JobListContainer from './JobListContainer'

jest.mock('./JobList', () => jest.fn())

afterEach(() => {
    jest.resetAllMocks()
})

describe('<JobListContainer>', () => {
    it('renders without errors when there is data', () => {
        const store = {
            jobs: [
                { id: 'one', name: 'one' },
                { id: 'two', name: 'two' },
            ],
        }

        shallow(
            <StoreContext.Provider value={store}>
                <JobListContainer />
            </StoreContext.Provider>
        )
    })

    it('omits system jobs by default', () => {
        JobList.mockImplementation(() => null)

        const userJob = { id: 'user', name: 'user', configurable: true }
        const systemJob = { id: 'system', name: 'system' }
        const store = {
            jobs: [userJob, systemJob],
        }

        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <JobListContainer />
            </StoreContext.Provider>
        )
        const childProps = wrapper.children().props()

        expect(childProps.jobs).toHaveLength(1)
        expect(childProps.jobs).toEqual(expect.arrayContaining([userJob]))
    })

    it('passes system and user jobs after toggling', () => {
        JobList.mockImplementation(({ showSystemJobs, setShowSystemJobs }) => (
            <button
                data-test="mock-toggle"
                onClick={() => setShowSystemJobs(!showSystemJobs)}
            />
        ))

        const userJob = { id: 'user', name: 'user', configurable: true }
        const systemJob = { id: 'system', name: 'system' }
        const store = {
            jobs: [userJob, systemJob],
        }

        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <JobListContainer />
            </StoreContext.Provider>
        )

        wrapper.find({ 'data-test': 'mock-toggle' }).simulate('click')

        const childProps = wrapper.children().props()

        expect(childProps.jobs).toHaveLength(2)
        expect(childProps.jobs).toEqual(
            expect.arrayContaining([userJob, systemJob])
        )
    })

    it('filters jobs after updating the filter', () => {
        JobList.mockImplementation(({ setJobFilter }) => (
            <input
                data-test="mock-input"
                onChange={e => setJobFilter(e.target.value)}
            />
        ))

        const one = { id: 'one', name: 'one', configurable: true }
        const two = { id: 'two', name: 'two', configurable: true }
        const store = {
            jobs: [one, two],
        }

        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <JobListContainer />
            </StoreContext.Provider>
        )

        wrapper
            .find({ 'data-test': 'mock-input' })
            .simulate('change', { target: { value: 'two' } })

        const childProps = wrapper.children().props()

        expect(childProps.jobs).toHaveLength(1)
        expect(childProps.jobs).toEqual(expect.arrayContaining([two]))
    })
})
