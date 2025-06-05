import React from 'react'
import { shallow } from 'enzyme'
import { useJobsAndQueues } from '../../hooks/jobs-and-queues'
import JobAndQueueList from './JobAndQueueList'

jest.mock('../../hooks/jobs-and-queues', () => ({
    useJobsAndQueues: jest.fn(),
}))

jest.mock('../../components/Store', () => ({
    useStore: jest.fn(() => ({
        nameFilter: '',
        setNameFilter: () => {},
        showSystemJobs: false,
        setShowSystemJobs: () => {},
    })),
}))

describe('<JobAndQueueList>', () => {
    it('renders a spinner when loading the jobs and queues', () => {
        useJobsAndQueues.mockImplementation(() => ({ loading: true }))

        const wrapper = shallow(<JobAndQueueList />)
        const spinner = wrapper.find('Spinner')

        expect(spinner).toHaveLength(1)
    })

    it('renders errors encountered during fetching', () => {
        useJobsAndQueues.mockImplementation(() => ({
            loading: false,
            error: new Error('Something went wrong'),
        }))

        const wrapper = shallow(<JobAndQueueList />)
        const noticebox = wrapper.find('NoticeBox')

        expect(noticebox).toHaveLength(1)
    })

    it('renders without errors when loading has completed', () => {
        useJobsAndQueues.mockImplementation(() => ({
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

        const wrapper = shallow(<JobAndQueueList />)
        const jobtable = wrapper.find('JobTable')

        expect(jobtable).toHaveLength(1)
    })
})
