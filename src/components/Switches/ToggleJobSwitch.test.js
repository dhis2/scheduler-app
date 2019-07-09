import React from 'react'
import { shallow, mount } from 'enzyme'
import { UnconnectedToggleJobSwitch as ToggleJobSwitch } from './ToggleJobSwitch'

describe('<ToggleJobSwitch>', () => {
    it('renders correctly', () => {
        const enableJob = () => {}
        const disableJob = () => {}
        const wrapper = shallow(
            <ToggleJobSwitch
                id="1"
                isFetching={false}
                checked={true}
                enableJob={enableJob}
                disableJob={disableJob}
            />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('calls enableJob when unchecked and checkbox changes to true', () => {
        const enableJob = jest.fn()
        const disableJob = () => {}
        const wrapper = mount(
            <ToggleJobSwitch
                id="1"
                isFetching={false}
                checked={false}
                enableJob={enableJob}
                disableJob={disableJob}
            />
        )

        wrapper.find('input').simulate('change', { target: { checked: true } })

        expect(enableJob).toHaveBeenCalled()
    })

    it('calls disableJob when checked and checkbox changes to false', () => {
        const disableJob = jest.fn()
        const enableJob = () => {}
        const wrapper = mount(
            <ToggleJobSwitch
                id="1"
                isFetching={false}
                checked={true}
                enableJob={enableJob}
                disableJob={disableJob}
            />
        )

        wrapper.find('input').simulate('change', { target: { checked: false } })

        expect(disableJob).toHaveBeenCalled()
    })

    it('disables itself whilst jobs are fetching', () => {
        const disableJob = () => {}
        const enableJob = () => {}
        const wrapper = mount(
            <ToggleJobSwitch
                id="1"
                isFetching={true}
                checked={true}
                enableJob={enableJob}
                disableJob={disableJob}
            />
        )

        const input = wrapper.find('input')

        expect(input.props().disabled).toBe(true)
    })
})
