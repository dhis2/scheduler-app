import React from 'react'
import { shallow } from 'enzyme'
import { Tooltip } from '@dhis2/ui'
import NextRun from './NextRun'

// Z is the zone designator for the zero UTC offset
const now = new Date('2010-10-10T10:10:10.000Z').valueOf()

// The server timezone is corrected by useTimeZoneConversion hook, but in test will run without correction
const past = '2009-10-10T10:10:10.000'
const future = '2011-10-10T10:10:10.000'
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

describe('<NextRun>', () => {
    it('returns the next run time for an enabled job and a future execution time', () => {
        const expected = `2011-10-10 10:10:10 (${timeZone})`
        jest.spyOn(global.Date, 'now').mockImplementation(() => now)

        const wrapper = shallow(
            <NextRun nextExecutionTime={future} enabled={true} />
        )
        expect(wrapper.find(Tooltip).render().text()).toEqual(expected)
    })

    it('returns fallback message for an enabled job and a past execution time', () => {
        const expected = 'Not scheduled'
        jest.spyOn(global.Date, 'now').mockImplementation(() => now)

        const wrapper = shallow(
            <NextRun nextExecutionTime={past} enabled={true} />
        )

        expect(wrapper.text()).toEqual(expect.stringMatching(expected))
    })

    it('returns fallback message for a disabled job', () => {
        const expected = '-'
        jest.spyOn(global.Date, 'now').mockImplementation(() => now)

        const wrapper = shallow(
            <NextRun nextExecutionTime={''} enabled={false} />
        )

        expect(wrapper.text()).toEqual(expect.stringMatching(expected))
    })
})
