import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDataMutation } from '@dhis2/app-runtime'
import RunJobModal from './RunJobModal'

jest.mock('@dhis2/app-runtime', () => ({
    useDataMutation: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<RunJobModal>', () => {
    it('renders without errors', () => {
        useDataMutation.mockImplementation(() => [
            jest.fn(),
            { loading: false, error: null },
        ])

        const props = {
            id: 'id',
            hideModal: () => {},
            onComplete: () => {},
        }

        shallow(<RunJobModal {...props} />)
    })

    it('calls hideModal when cancel button is clicked', () => {
        useDataMutation.mockImplementation(() => [
            jest.fn(),
            { loading: false, error: null },
        ])

        const props = {
            id: 'id',
            hideModal: jest.fn(),
            onComplete: () => {},
        }
        const wrapper = mount(<RunJobModal {...props} />)

        wrapper.find('button').find({ name: 'hide-modal' }).simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })

    it('calls hideModal when backdrop is clicked', () => {
        useDataMutation.mockImplementation(() => [
            jest.fn(),
            { loading: false, error: null },
        ])

        const props = {
            id: 'id',
            hideModal: jest.fn(),
            onComplete: () => {},
        }
        const wrapper = mount(<RunJobModal {...props} />)

        // Not a stable selector, but the backdrop does not have a data-test attribute
        wrapper.find('.backdrop').simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })

    it('runs the expected tasks after a click on run job', async () => {
        const resolvedPromise = Promise.resolve()
        const onCompleteSpy = jest.fn()
        const hideModalSpy = jest.fn()
        const mutateSpy = jest.fn(() => resolvedPromise)
        let onComplete
        useDataMutation.mockImplementation((mutation, options) => {
            onComplete = options.onComplete
            return [mutateSpy, { loading: false, error: null }]
        })

        const props = {
            id: 'id',
            hideModal: hideModalSpy,
            onComplete: onCompleteSpy,
        }
        const wrapper = mount(<RunJobModal {...props} />)

        wrapper
            .find('button')
            .find({ name: 'run-job-id', type: 'button' })
            .simulate('click')

        await resolvedPromise
        expect(mutateSpy).toHaveBeenCalled()

        onComplete()
        expect(hideModalSpy).toHaveBeenCalled()
        expect(onCompleteSpy).toHaveBeenCalled()
    })
})
