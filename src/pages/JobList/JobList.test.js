import React from 'react'
import { mount } from 'enzyme'
import history from '../../services/history'
import JobList from './JobList'

jest.mock('../../components/JobTable', () => ({ JobTable: () => null }))

jest.mock('../../services/history', () => ({
    push: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<JobList>', () => {
    it('calls setJobFilter with changes to the job filter input', () => {
        const spy = jest.fn()
        const props = {
            jobs: [{ id: 'one' }],
            isLoading: false,
            showSystemJobs: false,
            setShowSystemJobs: () => {},
            jobFilter: '',
            setJobFilter: spy,
        }
        const wrapper = mount(<JobList {...props} />)

        wrapper
            .find({ 'data-test': 'job-filter-input' })
            .find('input')
            .simulate('change', { target: { value: 'Change' } })

        expect(spy).toHaveBeenCalledWith('Change')
    })

    it('calls setShowSystemJobs when the show system jobs toggle is clicked', () => {
        const spy = jest.fn()
        const props = {
            jobs: [{ id: 'one' }],
            isLoading: false,
            showSystemJobs: false,
            setShowSystemJobs: spy,
            jobFilter: '',
            setJobFilter: () => {},
        }
        const wrapper = mount(<JobList {...props} />)

        wrapper
            .find({ 'data-test': 'job-toggle-switch' })
            .find('input')
            .simulate('change', { target: { value: !props.showSystemJobs } })

        expect(spy).toHaveBeenCalledWith(true)
    })

    it('redirects to /add when the new job button is clicked', () => {
        const spy = jest.fn()
        history.push.mockImplementation(spy)

        const props = {
            jobs: [{ id: 'one' }],
            isLoading: false,
            showSystemJobs: false,
            setShowSystemJobs: spy,
            jobFilter: '',
            setJobFilter: () => {},
        }
        const wrapper = mount(<JobList {...props} />)

        wrapper
            .find('button')
            .find({ 'data-test': 'new-job-button' })
            .simulate('click')

        expect(spy).toHaveBeenCalledWith('/add')
    })
})
