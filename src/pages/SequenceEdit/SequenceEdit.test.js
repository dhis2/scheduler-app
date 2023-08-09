import React from 'react'
import { shallow } from 'enzyme'
import { useParams } from 'react-router-dom'
import { useJobScheduleById } from '../../hooks/job-schedules'
import SequenceEdit from './SequenceEdit'

jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
}))

jest.mock('../../hooks/job-schedules', () => ({
    useJobScheduleById: jest.fn(),
}))

describe('<SequenceEdit>', () => {
    it('renders a spinner when loading the requested job', () => {
        const id = 'id'

        useParams.mockImplementation(() => id)
        useJobScheduleById.mockImplementation(() => ({ fetching: true }))

        const wrapper = shallow(<SequenceEdit />)
        const spinner = wrapper.find('Spinner')

        expect(spinner).toHaveLength(1)
    })

    it('renders errors encountered during fetching', () => {
        const id = 'id'

        useParams.mockImplementation(() => id)
        useJobScheduleById.mockImplementation(() => ({
            fetching: false,
            error: new Error('Something went wrong'),
        }))

        const wrapper = shallow(<SequenceEdit />)
        const noticebox = wrapper.find('NoticeBox')

        expect(noticebox).toHaveLength(1)
    })

    it('renders without errors when loading has completed', () => {
        const id = 'id'

        useParams.mockImplementation(() => id)
        useJobScheduleById.mockImplementation(() => ({
            fetching: false,
            error: undefined,
            data: {
                name: '',
                cronExpression: '',
                sequence: [],
            },
        }))

        const wrapper = shallow(<SequenceEdit />)
        const jobform = wrapper.find('SequenceEditFormContainer')

        expect(jobform).toHaveLength(1)
    })
})
