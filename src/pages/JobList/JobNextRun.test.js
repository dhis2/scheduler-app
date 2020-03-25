import React from 'react'
import { shallow } from 'enzyme'
import JobNextRun from './JobNextRun'

// Z is the zone designator for the zero UTC offset
const now = new Date('2010-10-10T10:10:10.000Z').valueOf()

// The server does not specify a timezone, but is assumed to provide UTC
const past = '2009-10-10T10:10:10.000'
const future = '2011-10-10T10:10:10.000'

describe('<JobNextRun>', () => {
    it('returns the next run time for an enabled job and a future execution time', () => {
        jest.spyOn(global.Date, 'now').mockImplementationOnce(() => now)

        const wrapper = shallow(
            <JobNextRun nextExecutionTime={future} enabled={true} />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('returns fallback message for an enabled job and a past execution time', () => {
        jest.spyOn(global.Date, 'now').mockImplementationOnce(() => now)

        const wrapper = shallow(
            <JobNextRun nextExecutionTime={past} enabled={true} />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('returns fallback message for a disabled job', () => {
        jest.spyOn(global.Date, 'now').mockImplementationOnce(() => now)

        const wrapper = shallow(
            <JobNextRun nextExecutionTime={''} enabled={false} />
        )

        expect(wrapper).toMatchSnapshot()
    })
})
