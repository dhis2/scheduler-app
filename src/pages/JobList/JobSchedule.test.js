import React from 'react'
import { shallow } from 'enzyme'
import JobSchedule from './JobSchedule'

describe('<JobSchedule>', () => {
    it('renders a human readable cron for the CRON scheduling type', () => {
        const wrapper = shallow(
            <JobSchedule
                schedulingType="CRON"
                cronExpression="cronExpression"
            />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('renders a delay for the FIXED_DELAY scheduling type', () => {
        const wrapper = shallow(
            <JobSchedule schedulingType="FIXED_DELAY" delay={1000} />
        )

        expect(wrapper.text()).toEqual(
            expect.stringContaining('1000 seconds after last run')
        )
    })

    it('renders a dash for an unrecognised scheduling type', () => {
        const wrapper = shallow(<JobSchedule schedulingType="NONEXISTENT" />)

        expect(wrapper.text()).toEqual(expect.stringContaining('-'))
    })
})
