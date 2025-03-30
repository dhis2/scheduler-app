import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDataMutation } from '@dhis2/app-runtime'
import DeleteJobModal from './DeleteJobModal'

jest.mock('@dhis2/app-runtime', () => ({
    useDataMutation: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<DeleteJobModal>', () => {
    it('renders without errors', () => {
        useDataMutation.mockImplementation(() => [() => {}])

        const props = {
            id: 'id',
            hideModal: () => {},
            onSuccess: () => {},
        }

        shallow(<DeleteJobModal {...props} />)
    })

    it('calls hideModal when cancel button is clicked', () => {
        useDataMutation.mockImplementation(() => [() => {}])

        const props = {
            id: 'id',
            hideModal: jest.fn(),
            onSuccess: () => {},
        }
        const wrapper = mount(<DeleteJobModal {...props} />)

        wrapper.find('button').find({ name: 'hide-modal' }).simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })

    it('calls deleteJob, onSuccess and hideModal when delete button is clicked', async () => {
        const deletion = Promise.resolve()
        const deleteJobSpy = jest.fn(() => deletion)
        const onSuccessSpy = jest.fn(() => {})
        const hideModalSpy = jest.fn(() => {})
        const props = {
            id: 'id',
            hideModal: hideModalSpy,
            onSuccess: onSuccessSpy,
        }

        useDataMutation.mockImplementation(() => [deleteJobSpy])

        const wrapper = mount(<DeleteJobModal {...props} />)

        wrapper.find('button').find({ name: 'delete-job-id' }).simulate('click')

        await deletion

        expect(deleteJobSpy).toHaveBeenCalledWith({ id: 'id' })
        expect(hideModalSpy).toHaveBeenCalled()
        expect(onSuccessSpy).toHaveBeenCalled()
    })

    it('calls hideModal when backdrop is clicked', () => {
        useDataMutation.mockImplementation(() => [() => {}])

        const props = {
            id: 'id',
            hideModal: jest.fn(),
            onSuccess: () => {},
        }
        const wrapper = mount(<DeleteJobModal {...props} />)

        // Not a stable selector, but the backdrop does not have a data-test attribute
        wrapper.find('.backdrop').simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })
})
