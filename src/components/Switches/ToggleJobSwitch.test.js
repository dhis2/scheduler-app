import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDataMutation } from '@dhis2/app-runtime'
import ToggleJobSwitch from './ToggleJobSwitch'

jest.mock('@dhis2/app-runtime', () => ({
    useDataMutation: jest.fn(() => [() => {}, {}]),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<ToggleJobSwitch>', () => {
    it('renders without errors', () => {
        shallow(
            <ToggleJobSwitch
                id="1"
                checked={true}
                disabled={false}
                refetch={() => {}}
            />
        )
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
            refetch: refetchSpy,
        }

        useDataMutation.mockImplementation(() => [toggleJobSpy, {}])

        const wrapper = mount(<ToggleJobSwitch {...props} />)

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
