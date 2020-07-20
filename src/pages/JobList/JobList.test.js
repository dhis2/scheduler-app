import React from 'react'
import { mount } from 'enzyme'
import history from '../../services/history'
import JobList from './JobList'

jest.mock('./JobListTable', () => () => null)

jest.mock('../../services/history', () => ({
    push: jest.fn(),
}))

describe('<JobList>', () => {
    it('calls setJobFilter with changes to the job filter input', () => {
        const spy = jest.fn()
        const props = {
            jobIds: ['one'],
            jobEntities: {
                one: {},
            },
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

        wrapper.unmount()
    })

    it('calls setShowSystemJobs when the show system jobs toggle is clicked', () => {
        const spy = jest.fn()
        const props = {
            jobIds: ['one'],
            jobEntities: {
                one: {},
            },
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

        wrapper.unmount()
    })

    it('redirects to /add when the new job button is clicked', () => {
        const spy = jest.fn()
        history.push = spy
        const props = {
            jobIds: ['one'],
            jobEntities: {
                one: {},
            },
            isLoading: false,
            showSystemJobs: false,
            setShowSystemJobs: spy,
            jobFilter: '',
            setJobFilter: () => {},
        }
        const wrapper = mount(<JobList {...props} />)

        /**
         * This should be made more specific once
         * https://github.com/dhis2/ui/issues/215 has been fixed
         */
        wrapper.find('button').simulate('click')

        expect(spy).toHaveBeenCalledWith('/add')

        wrapper.unmount()
    })
})
