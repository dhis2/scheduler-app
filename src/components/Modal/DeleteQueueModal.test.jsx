import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDataMutation } from '@dhis2/app-runtime'
import DeleteQueueModal from './DeleteQueueModal'

jest.mock('@dhis2/app-runtime', () => ({
    useDataMutation: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<DeleteQueueModal>', () => {
    it('renders without errors', () => {
        useDataMutation.mockImplementation(() => [() => {}])

        const props = {
            name: 'name',
            hideModal: () => {},
            onSuccess: () => {},
        }

        shallow(<DeleteQueueModal {...props} />)
    })

    it('calls hideModal when cancel button is clicked', () => {
        useDataMutation.mockImplementation(() => [() => {}])

        const props = {
            name: 'name',
            hideModal: jest.fn(),
            onSuccess: () => {},
        }
        const wrapper = mount(<DeleteQueueModal {...props} />)

        wrapper.find('button').find({ name: 'hide-modal' }).simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })

    it('calls deleteQueue, onSuccess and hideModal when delete button is clicked', async () => {
        const deletion = Promise.resolve()
        const deleteQueueSpy = jest.fn(() => deletion)
        const onSuccessSpy = jest.fn(() => {})
        const hideModalSpy = jest.fn(() => {})
        const props = {
            name: 'name',
            hideModal: hideModalSpy,
            onSuccess: onSuccessSpy,
        }

        useDataMutation.mockImplementation(() => [deleteQueueSpy])

        const wrapper = mount(<DeleteQueueModal {...props} />)

        wrapper
            .find('button')
            .find({ name: 'delete-queue-name' })
            .simulate('click')

        await deletion

        expect(deleteQueueSpy).toHaveBeenCalled()
        expect(hideModalSpy).toHaveBeenCalled()
        expect(onSuccessSpy).toHaveBeenCalled()
    })

    it('calls hideModal when backdrop is clicked', () => {
        useDataMutation.mockImplementation(() => [() => {}])

        const props = {
            name: 'name',
            hideModal: jest.fn(),
            onSuccess: () => {},
        }
        const wrapper = mount(<DeleteQueueModal {...props} />)

        // Not a stable selector, but the backdrop does not have a data-test attribute
        wrapper.find('.backdrop').simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })
})
