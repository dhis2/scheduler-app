import React from 'react'
import { shallow } from 'enzyme'
import Schedule from './Schedule'

describe('<Schedule>', () => {
    it('renders a human readable cron for the CRON scheduling type', () => {
        const wrapper = shallow(
            <Schedule schedulingType="CRON" cronExpression="0 0 1 ? * *" />
        )

        expect(wrapper.text()).toEqual(expect.stringContaining('At 01:00 AM'))
    })

    it('renders a delay for the FIXED_DELAY scheduling type', () => {
        const wrapper = shallow(
            <Schedule schedulingType="FIXED_DELAY" delay={1000} />
        )

        expect(wrapper.text()).toEqual(
            expect.stringContaining('1000 seconds after last run')
        )
    })

    it('renders a dash for an unrecognised scheduling type', () => {
        const wrapper = shallow(<Schedule schedulingType="NONEXISTENT" />)

        expect(wrapper.text()).toEqual(expect.stringContaining('-'))
    })
})
