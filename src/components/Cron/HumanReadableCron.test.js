import React from 'react'
import { shallow } from 'enzyme'
import { useGetUserSettings, selectors } from '../../hooks/user-settings'
import HumanReadableCron from './HumanReadableCron'

jest.mock('../../hooks/user-settings', () => ({
    useGetUserSettings: jest.fn(() => [() => {}]),
    selectors: {
        getLocale: jest.fn(() => ''),
    },
}))

describe('<HumanReadableCron>', () => {
    it('returns nothing while loading', () => {
        useGetUserSettings.mockImplementationOnce(() => ({
            loading: true,
            error: undefined,
            data: undefined,
        }))
        const cronExpression = '0 0 1 ? * *'
        const wrapper = shallow(
            <HumanReadableCron cronExpression={cronExpression} />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('falls back to English in case of an error', () => {
        useGetUserSettings.mockImplementationOnce(() => ({
            loading: false,
            error: new Error('error'),
            data: undefined,
        }))
        const cronExpression = '0 0 1 ? * *'
        const wrapper = shallow(
            <HumanReadableCron cronExpression={cronExpression} />
        )

        expect(wrapper.text()).toEqual(expect.stringContaining('At 01:00 AM'))
    })

    it('renders cron in locale when a locale is found', () => {
        useGetUserSettings.mockImplementationOnce(() => ({
            loading: false,
            error: undefined,
            data: {},
        }))
        selectors.getLocale.mockImplementationOnce(() => 'fr')
        const cronExpression = '0 0 1 ? * *'
        const wrapper = shallow(
            <HumanReadableCron cronExpression={cronExpression} />
        )

        expect(wrapper.text()).toEqual(expect.stringContaining('À 01:00 AM'))
    })
})
