import React from 'react'
import { shallow, mount } from 'enzyme'
import CronPresetButton from './CronPresetButton'

describe('<CronPresetButton>', () => {
    it('renders without errors', () => {
        shallow(<CronPresetButton setCron={() => {}} />)
    })

    it('renders without errors when small', () => {
        shallow(<CronPresetButton setCron={() => {}} small />)
    })

    it('shows the modal when button is clicked', () => {
        const wrapper = mount(<CronPresetButton setCron={() => {}} />)

        expect(wrapper.find('CronPresetModal')).toHaveLength(0)

        wrapper.find('button').simulate('click')

        expect(wrapper.find('CronPresetModal')).toHaveLength(1)
    })
})
