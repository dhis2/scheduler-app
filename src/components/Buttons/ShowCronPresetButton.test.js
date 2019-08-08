import React from 'react'
import { shallow, mount } from 'enzyme'
import { DumbShowCronPresetButton as CronPresetButton } from './ShowCronPresetButton'

describe('<CronPresetButton>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<CronPresetButton showModal={() => {}} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('calls showModal correctly when clicked', () => {
        const showModal = jest.fn()
        const wrapper = mount(<CronPresetButton showModal={showModal} />)

        wrapper.find('button').simulate('click')

        expect(showModal.mock.calls[0][0]).toMatchSnapshot()
    })
})
