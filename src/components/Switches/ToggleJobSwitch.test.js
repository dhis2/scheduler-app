import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDataMutation } from '@dhis2/app-runtime'
import { StoreContext } from '../Store'
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

        shallow(<ToggleJobSwitch id="1" checked={true} disabled={false} />)
    })

    it('calls toggleJob and refetches when toggle is clicked', async () => {
        const checked = false
        const toggle = Promise.resolve()
        const toggleJobSpy = jest.fn(() => toggle)
        const refetchSpy = jest.fn(() => {})
        const props = {
            id: 'id',
            checked,
            disabled: false,
        }

        useDataMutation.mockImplementation(() => [toggleJobSpy, {}])

        const wrapper = mount(
            <StoreContext.Provider value={{ refetchJobs: refetchSpy }}>
                <ToggleJobSwitch {...props} />
            </StoreContext.Provider>
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
