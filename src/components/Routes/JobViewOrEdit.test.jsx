import React from 'react'
import { shallow } from 'enzyme'
import { useParams } from 'react-router-dom'
import { useJobById } from '../../hooks/jobs'
import JobViewOrEdit from './JobViewOrEdit'

jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
}))

jest.mock('../../hooks/jobs', () => ({
    useJobById: jest.fn(),
}))

describe('<JobViewOrEdit>', () => {
    it('renders a spinner when loading the requested job', () => {
        const id = 'id'

        useParams.mockImplementation(() => id)
        useJobById.mockImplementation(() => ({ fetching: true }))

        const wrapper = shallow(<JobViewOrEdit />)
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

        const wrapper = shallow(<JobViewOrEdit />)
        const noticebox = wrapper.find('NoticeBox')

        expect(noticebox).toHaveLength(1)
    })

    it('renders JobEdit if the job is configurable', () => {
        const id = 'id'

        useParams.mockImplementation(() => id)
        useJobById.mockImplementation(() => ({
            fetching: false,
            error: undefined,
            data: {
                name: 'name',
                created: '',
                lastExecutedStatus: '',
                lastExecuted: '',
                configurable: true,
            },
        }))

        const wrapper = shallow(<JobViewOrEdit />)
        const component = wrapper.find('JobEdit')

        expect(component).toHaveLength(1)
    })

    it('renders JobView if the job is not configurable', () => {
        const id = 'id'

        useParams.mockImplementation(() => id)
        useJobById.mockImplementation(() => ({
            fetching: false,
            error: undefined,
            data: {
                name: 'name',
                created: '',
                lastExecutedStatus: '',
                lastExecuted: '',
                jobType: '',
                cronExpression: '',
                configurable: false,
            },
        }))

        const wrapper = shallow(<JobViewOrEdit />)
        const component = wrapper.find('JobView')

        expect(component).toHaveLength(1)
    })
})
