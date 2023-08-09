import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDataMutation } from '@dhis2/app-runtime'
import DeleteSequenceModal from './DeleteSequenceModal'

jest.mock('@dhis2/app-runtime', () => ({
    useDataMutation: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<DeleteSequenceModal>', () => {
    it('renders without errors', () => {
        useDataMutation.mockImplementation(() => [() => {}])

        const props = {
            name: 'name',
            hideModal: () => {},
            onSuccess: () => {},
        }

        shallow(<DeleteSequenceModal {...props} />)
    })

    it('calls hideModal when cancel button is clicked', () => {
        useDataMutation.mockImplementation(() => [() => {}])

        const props = {
            name: 'name',
            hideModal: jest.fn(),
            onSuccess: () => {},
        }
        const wrapper = mount(<DeleteSequenceModal {...props} />)

        wrapper.find('button').find({ name: 'hide-modal' }).simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })

    it('calls deleteSequence, onSuccess and hideModal when delete button is clicked', async () => {
        const deletion = Promise.resolve()
        const deleteSequenceSpy = jest.fn(() => deletion)
        const onSuccessSpy = jest.fn(() => {})
        const hideModalSpy = jest.fn(() => {})
        const props = {
            name: 'name',
            hideModal: hideModalSpy,
            onSuccess: onSuccessSpy,
        }

        useDataMutation.mockImplementation(() => [deleteSequenceSpy])

        const wrapper = mount(<DeleteSequenceModal {...props} />)

        wrapper
            .find('button')
            .find({ name: 'delete-sequence-name' })
            .simulate('click')

        await deletion

        expect(deleteSequenceSpy).toHaveBeenCalled()
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
        const wrapper = mount(<DeleteSequenceModal {...props} />)

        // Not a stable selector, but the backdrop does not have a data-test attribute
        wrapper.find('.backdrop').simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })
})
