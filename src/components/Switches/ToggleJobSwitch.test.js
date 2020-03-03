import React from 'react'
import { shallow, mount } from 'enzyme'
import { useToggleJob } from '../../hooks/jobs'
import { RefetchJobsContext } from '../Context'
import ToggleJobSwitch from './ToggleJobSwitch'

jest.mock('../../hooks/jobs', () => ({
    useToggleJob: jest.fn(() => [() => {}, {}]),
}))

describe('<ToggleJobSwitch>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<ToggleJobSwitch id="1" checked={true} />)

        expect(wrapper).toMatchSnapshot()
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

        useToggleJob.mockImplementationOnce(() => [toggleJobSpy, {}])

        const wrapper = mount(
            <RefetchJobsContext.Provider value={refetchSpy}>
                <ToggleJobSwitch {...props} />
            </RefetchJobsContext.Provider>
        )

        wrapper
            .find('input[name="toggle-job-id"]')
            .simulate('change', { target: { checked: !checked } })

        await toggle

        expect(toggleJobSpy).toHaveBeenCalledWith({
            id: 'id',
            enabled: !checked,
        })
        expect(refetchSpy).toHaveBeenCalled()
    })
})
