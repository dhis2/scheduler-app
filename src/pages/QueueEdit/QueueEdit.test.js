import React from 'react'
import { shallow } from 'enzyme'
import { useParams } from 'react-router-dom'
import { useQueueByName } from '../../hooks/queues'
import { useJobs } from '../../hooks/jobs'
import QueueEdit from './QueueEdit'

jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
}))

jest.mock('../../hooks/queues/', () => ({
    useQueueByName: jest.fn(),
}))

jest.mock('../../hooks/jobs/', () => ({
    useJobs: jest.fn(),
}))

describe('<QueueEdit>', () => {
    it('renders a spinner when loading the requested queue', () => {
        const name = 'name'

        useParams.mockImplementation(() => name)
        useQueueByName.mockImplementation(() => ({ fetching: true }))
        useJobs.mockImplementation(() => ({ fetching: true }))

        const wrapper = shallow(<QueueEdit />)
        const spinner = wrapper.find('Spinner')

        expect(spinner).toHaveLength(1)
    })

    it('renders queue errors encountered during fetching', () => {
        const name = 'name'

        useParams.mockImplementation(() => name)
        useQueueByName.mockImplementation(() => ({
            fetching: false,
            error: new Error('Something went wrong'),
        }))
        useJobs.mockImplementation(() => ({ fetching: false }))

        const wrapper = shallow(<QueueEdit />)
        const noticebox = wrapper.find('NoticeBox')

        expect(noticebox).toHaveLength(1)
    })

    it('renders job errors encountered during fetching', () => {
        const name = 'name'

        useParams.mockImplementation(() => name)
        useQueueByName.mockImplementation(() => ({ fetching: false }))
        useJobs.mockImplementation(() => ({
            fetching: false,
            error: new Error('Something went wrong'),
        }))

        const wrapper = shallow(<QueueEdit />)
        const noticebox = wrapper.find('NoticeBox')

        expect(noticebox).toHaveLength(1)
    })

    it('renders without errors when loading has completed', () => {
        const name = 'name'

        useParams.mockImplementation(() => name)
        useQueueByName.mockImplementation(() => ({
            fetching: false,
            error: undefined,
            data: {
                name: '',
                cronExpression: '',
                sequence: [],
            },
        }))
        useJobs.mockImplementation(() => ({
            fetching: false,
            error: undefined,
            data: [],
        }))

        const wrapper = shallow(<QueueEdit />)
        const jobform = wrapper.find('QueueEditFormContainer')

        expect(jobform).toHaveLength(1)
    })
})
