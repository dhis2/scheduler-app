import React from 'react'
import { shallow, mount } from 'enzyme'
import { UnconnectedJobToggleSwitch as JobToggleSwitch } from './JobToggleSwitch'

describe('<JobToggleSwitch>', () => {
    it('renders correctly', () => {
        const enableJob = () => {}
        const disableJob = () => {}
        const wrapper = shallow(
            <JobToggleSwitch
                id="1"
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
            <JobToggleSwitch
                id="1"
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
            <JobToggleSwitch
                id="1"
                checked={true}
                enableJob={enableJob}
                disableJob={disableJob}
            />
        )

        wrapper.find('input').simulate('change', { target: { checked: false } })

        expect(disableJob).toHaveBeenCalled()
    })
})
