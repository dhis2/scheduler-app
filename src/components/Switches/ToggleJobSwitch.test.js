import React from 'react'
import waitForExpect from 'wait-for-expect'
import { shallow, mount } from 'enzyme'
import { CustomDataProvider } from '@dhis2/app-runtime'
import ToggleJobSwitch from './ToggleJobSwitch'

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

    it('enables an inactive job and refetches when toggle is clicked', async () => {
        const answerSpy = jest.fn(() => 'response')
        const refetchSpy = jest.fn(() => Promise.resolve())

        const props = {
            id: 'id',
            checked: false,
            disabled: false,
            refetch: refetchSpy,
        }
        const data = { 'jobConfigurations/id/enable': answerSpy }
        const wrapper = mount(<ToggleJobSwitch {...props} />, {
            wrappingComponent: CustomDataProvider,
            wrappingComponentProps: { data },
        })

        wrapper
            .find('input')
            .find({ name: 'toggle-job-id' })
            .simulate('change', { target: { checked: !props.checked } })

        await waitForExpect(() => {
            expect(answerSpy).toHaveBeenCalledWith(
                'create',
                expect.anything(),
                expect.anything()
            )
            expect(refetchSpy).toHaveBeenCalled()
        })
    })

    it('disables an active job and refetches when toggle is clicked', async () => {
        const answerSpy = jest.fn(() => 'response')
        const refetchSpy = jest.fn(() => Promise.resolve())

        const props = {
            id: 'id',
            checked: true,
            disabled: false,
            refetch: refetchSpy,
        }
        const data = { 'jobConfigurations/id/disable': answerSpy }
        const wrapper = mount(<ToggleJobSwitch {...props} />, {
            wrappingComponent: CustomDataProvider,
            wrappingComponentProps: { data },
        })

        wrapper
            .find('input')
            .find({ name: 'toggle-job-id' })
            .simulate('change', { target: { checked: !props.checked } })

        await waitForExpect(() => {
            expect(answerSpy).toHaveBeenCalledWith(
                'create',
                expect.anything(),
                expect.anything()
            )
            expect(refetchSpy).toHaveBeenCalled()
        })
    })
})
