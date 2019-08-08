import React from 'react'
import { shallow, mount } from 'enzyme'
import { DumbCronPresetModal as CronPresetModal } from './CronPresetModal'

describe('<CronPresetModal>', () => {
    it('renders correctly', () => {
        const props = {
            hideModal: () => {},
            setPreset: () => {},
        }
        const wrapper = shallow(<CronPresetModal {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('calls hideModal when cancel button is clicked', () => {
        const props = {
            hideModal: jest.fn(),
            setPreset: () => {},
        }
        const wrapper = mount(<CronPresetModal {...props} />)

        wrapper.find('button[name="hide-modal"]').simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })

    it('calls setPreset and hideModal when a value is selected and insert preset button is clicked', () => {
        // Value from the presets in CronPresetModal, the test will break if this value does not exist
        const value = '0 0 3 ? * MON'
        const props = {
            hideModal: jest.fn(),
            setPreset: jest.fn(),
        }
        const wrapper = mount(<CronPresetModal {...props} />)

        wrapper
            .find(`input[value="${value}"]`)
            .simulate('change', { target: { value } })
        wrapper.find('button[name="insert-preset"]').simulate('click')

        expect(props.setPreset).toHaveBeenCalledWith(value)
        expect(props.hideModal).toHaveBeenCalled()
    })

    it('calls hideModal when cover is clicked', () => {
        const props = {
            hideModal: jest.fn(),
            setPreset: () => {},
        }
        const wrapper = mount(<CronPresetModal {...props} />)

        wrapper.find('.backdrop').simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })
})
