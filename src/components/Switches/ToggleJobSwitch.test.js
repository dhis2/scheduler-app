import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDataMutation } from '@dhis2/app-runtime'
import { JobContext } from '../JobStore'
import ToggleJobSwitch from './ToggleJobSwitch'

jest.mock('@dhis2/app-runtime', () => ({
    useDataMutation: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<ToggleJobSwitch>', () => {
    it('renders without errors', () => {
        useDataMutation.mockImplementation(() => [() => {}, {}])

        shallow(<ToggleJobSwitch id="1" checked={true} />)
    })

    it('calls toggleJob and refetches when toggle is clicked', async () => {
        const checked = false
        const toggle = Promise.resolve()
        const toggleJobSpy = jest.fn(() => toggle)
        const refetchSpy = jest.fn(() => {})
        const props = {
            id: 'id',
            checked,
        }

        useDataMutation.mockImplementation(() => [toggleJobSpy, {}])

        const wrapper = mount(
            <JobContext.Provider value={{ refetch: refetchSpy }}>
                <ToggleJobSwitch {...props} />
            </JobContext.Provider>
        )

        wrapper
            .find('input')
            .find({ name: 'toggle-job-id' })
            .simulate('change', { target: { checked: !checked } })

        await toggle

        expect(toggleJobSpy).toHaveBeenCalledWith({
            id: 'id',
            enabled: !checked,
        })
        expect(refetchSpy).toHaveBeenCalled()
    })
})
