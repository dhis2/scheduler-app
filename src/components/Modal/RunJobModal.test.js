import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDataEngine } from '@dhis2/app-runtime'
import { JobContext } from '../JobStore'
import RunJobModal from './RunJobModal'

jest.mock('@dhis2/app-runtime', () => ({
    useDataEngine: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<RunJobModal>', () => {
    it('renders without errors', () => {
        useDataEngine.mockImplementation(() => ({
            query: () => () => Promise.resolve(),
        }))

        const props = {
            id: 'id',
            hideModal: () => {},
        }

        shallow(<RunJobModal {...props} />)
    })

    it('calls hideModal when cancel button is clicked', () => {
        useDataEngine.mockImplementation(() => ({
            query: () => () => Promise.resolve(),
        }))

        const props = {
            id: 'id',
            hideModal: jest.fn(),
        }
        const wrapper = mount(<RunJobModal {...props} />)

        wrapper
            .find('button')
            .find({ name: 'hide-modal' })
            .simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })

    it('calls hideModal when cover is clicked', () => {
        useDataEngine.mockImplementation(() => ({
            query: () => () => Promise.resolve(),
        }))

        const props = {
            id: 'id',
            hideModal: jest.fn(),
        }
        const wrapper = mount(<RunJobModal {...props} />)

        wrapper.find({ 'data-test': 'dhis2-uicore-layer' }).simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })

    it('runs the expected tasks after a click on run job', async () => {
        const resolvedPromise = Promise.resolve()
        const querySpy = jest.fn(() => resolvedPromise)
        const refetchSpy = jest.fn()
        const hideModalSpy = jest.fn()
        const engineMock = {
            query: querySpy,
        }
        useDataEngine.mockImplementation(() => engineMock)

        const props = {
            id: 'id',
            hideModal: hideModalSpy,
        }
        const wrapper = mount(
            <JobContext.Provider value={{ refetch: refetchSpy }}>
                <RunJobModal {...props} />
            </JobContext.Provider>
        )

        wrapper
            .find('button')
            .find({ name: 'run-job-id', type: 'button' })
            .simulate('click')

        await resolvedPromise

        expect(querySpy).toHaveBeenCalled()
        expect(hideModalSpy).toHaveBeenCalled()
        expect(refetchSpy).toHaveBeenCalled()
    })
})
