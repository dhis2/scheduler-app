import React from 'react'
import { shallow, mount } from 'enzyme'
import CronPresetButton from './CronPresetButton'

describe('<CronPresetButton>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<CronPresetButton setCron={() => {}} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('renders small correctly', () => {
        const wrapper = shallow(<CronPresetButton setCron={() => {}} small />)

        expect(wrapper).toMatchSnapshot()
    })

    it('shows the modal when button is clicked', () => {
        const wrapper = mount(<CronPresetButton setCron={() => {}} />)

        expect(wrapper.find('CronPresetModal')).toHaveLength(0)

        wrapper.find('button').simulate('click')

        expect(wrapper.find('CronPresetModal')).toHaveLength(1)
    })
})
