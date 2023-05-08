import React from 'react'
import { shallow } from 'enzyme'
import { useParams } from 'react-router-dom'
import { useJobById } from '../../hooks/jobs'
import JobEdit from './JobEdit'

jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
}))

jest.mock('../../hooks/jobs', () => ({
    useJobById: jest.fn(),
}))

describe('<JobEdit>', () => {
    it('renders a spinner when loading the requested job', () => {
        const id = 'id'

        useParams.mockImplementation(() => id)
        useJobById.mockImplementation(() => ({ fetching: true }))

        const wrapper = shallow(<JobEdit />)
        const spinner = wrapper.find('Spinner')

        expect(spinner).toHaveLength(1)
    })

    it('renders errors encountered during fetching', () => {
        const id = 'id'

        useParams.mockImplementation(() => id)
        useJobById.mockImplementation(() => ({
            fetching: false,
            error: new Error('Something went wrong'),
        }))

        const wrapper = shallow(<JobEdit />)
        const noticebox = wrapper.find('NoticeBox')

        expect(noticebox).toHaveLength(1)
    })

    it('renders without errors when loading has completed', () => {
        const id = 'id'

        useParams.mockImplementation(() => id)
        useJobById.mockImplementation(() => ({
            fetching: false,
            error: undefined,
            data: {
                name: '',
                created: '',
                lastExecutedStatus: '',
                lastExecuted: '',
            },
        }))

        const wrapper = shallow(<JobEdit />)
        const jobform = wrapper.find('JobEditFormContainer')

        expect(jobform).toHaveLength(1)
    })
})
