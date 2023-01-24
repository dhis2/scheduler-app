import React from 'react'
import { mount, shallow } from 'enzyme'
import { Tooltip } from '@dhis2/ui'
import NextRun from './NextRun'

// Z is the zone designator for the zero UTC offset
const now = new Date('2010-10-10T10:10:10.000Z').valueOf()

const past = '2009-10-10T10:10:10.000'
const future = '2011-10-10T10:10:10.000'
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

// in this test, we are only passing timestamps to the hook (and there is no server/client time diff)
// so mock getServerZonedISOString by returning the original timestamp
jest.mock('@dhis2/app-runtime', () => ({
    useTimeZoneConversion: () => ({
        fromServerDate: (timestamp) => {
            const dhis2Date = new Date(timestamp)
            dhis2Date.getServerZonedISOString = () => timestamp
            dhis2Date.serverTimezone =
                Intl.DateTimeFormat().resolvedOptions().timeZone
            return dhis2Date
        },
    }),
}))

describe('<NextRun>', () => {
    it('returns the next run time for an enabled job and a future execution time', () => {
        const expected = `2011-10-10 10:10:10 (${timeZone})`
        jest.spyOn(global.Date, 'now').mockImplementation(() => now)

        const wrapper = mount(
            <NextRun nextExecutionTime={future} enabled={true} />
        )

        expect(wrapper.contains(expected)).toEqual(true)
    })

    it('returns the relative time in tooltip for an enabled job and a future execution time', () => {
        const expected = `in a year`
        jest.spyOn(global.Date, 'now').mockImplementation(() => now)

        const wrapper = shallow(
            <NextRun nextExecutionTime={future} enabled={true} />
        )

        expect(wrapper.find(Tooltip).prop('content')).toEqual(expected)
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
