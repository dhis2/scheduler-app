import React from 'react'
import { shallow, mount } from 'enzyme'
import CronPresetModal from './CronPresetModal'

describe('<CronPresetModal>', () => {
    it('renders without errors', () => {
        const props = {
            hideModal: () => {},
            setCron: () => {},
        }

        shallow(<CronPresetModal {...props} />)
    })

    it('calls hideModal when cancel button is clicked', () => {
        const props = {
            hideModal: jest.fn(),
            setCron: () => {},
        }
        const wrapper = mount(<CronPresetModal {...props} />)

        wrapper.find('button').find({ name: 'hide-modal' }).simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })

    it('calls setCron and hideModal when a value is selected and insert preset button is clicked', () => {
        // Value from the presets in CronPresetModal, the test will break if this value does not exist
        const value = '0 0 3 ? * MON'
        const props = {
            hideModal: jest.fn(),
            setCron: jest.fn(),
        }
        const wrapper = mount(<CronPresetModal {...props} />)

        wrapper
            .find('input')
            .find({ value })
            .simulate('change', { target: { value } })

        wrapper.find('button').find({ name: 'insert-preset' }).simulate('click')

        expect(props.setCron).toHaveBeenCalledWith(value)
        expect(props.hideModal).toHaveBeenCalled()
    })

    it('calls hideModal when backdrop is clicked', () => {
        const props = {
            hideModal: jest.fn(),
            setCron: () => {},
        }
        const wrapper = mount(<CronPresetModal {...props} />)

        // Not a stable selector, but the backdrop does not have a data-test attribute
        wrapper.find('.backdrop').simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })
})
