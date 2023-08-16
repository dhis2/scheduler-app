import React from 'react'
import { shallow } from 'enzyme'
import { useSchedules } from '../../hooks/schedules'
import JobList from './JobList'

jest.mock('../../hooks/schedules', () => ({
    useSchedules: jest.fn(),
}))

jest.mock('../../components/Store', () => ({
    useJobFilter: jest.fn(() => ['', () => {}]),
    useShowSystemJobs: jest.fn(() => [false, () => {}]),
}))

describe('<JobList>', () => {
    it('renders a spinner when loading the schedules', () => {
        useSchedules.mockImplementation(() => ({ loading: true }))

        const wrapper = shallow(<JobList />)
        const spinner = wrapper.find('Spinner')

        expect(spinner).toHaveLength(1)
    })

    it('renders errors encountered during fetching', () => {
        useSchedules.mockImplementation(() => ({
            loading: false,
            error: new Error('Something went wrong'),
        }))

        const wrapper = shallow(<JobList />)
        const noticebox = wrapper.find('NoticeBox')

        expect(noticebox).toHaveLength(1)
    })

    it('renders without errors when loading has completed', () => {
        useSchedules.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: [
                {
                    name: '',
                    configurable: true,
                },
            ],
            refetch: () => {},
        }))

        const wrapper = shallow(<JobList />)
        const jobtable = wrapper.find('JobTable')

        expect(jobtable).toHaveLength(1)
    })
})
