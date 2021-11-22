import React from 'react'
import { act } from 'react-dom/test-utils'
import { shallow, mount } from 'enzyme'
import { useDataEngine } from '@dhis2/app-runtime'
import { StoreContext } from '../Store'
import RunJobModal from './RunJobModal'

jest.mock('@dhis2/app-runtime', () => ({
    useDataEngine: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<RunJobModal>', () => {
    it('renders without errors', () => {
        const props = {
            id: 'id',
            hideModal: () => {},
        }

        shallow(<RunJobModal {...props} />)
    })

    it('calls hideModal when cancel button is clicked', () => {
        const props = {
            id: 'id',
            hideModal: jest.fn(),
        }
        const wrapper = mount(<RunJobModal {...props} />)

        wrapper.find('button').find({ name: 'hide-modal' }).simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })

    it('calls hideModal when cover is clicked', () => {
        const props = {
            id: 'id',
            hideModal: jest.fn(),
        }
        const wrapper = mount(<RunJobModal {...props} />)

        wrapper.find({ 'data-test': 'dhis2-uicore-layer' }).simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })

    it('runs the expected tasks after a click on run job', async () => {
        const resolvedPromise = Promise.resolve()
        const refetchSpy = jest.fn()
        const hideModalSpy = jest.fn()
        const mutateSpy = jest.fn(() => resolvedPromise)
        useDataEngine.mockImplementation(() => ({
            mutate: mutateSpy,
        }))

        const props = {
            id: 'id',
            hideModal: hideModalSpy,
        }
        const wrapper = mount(
            <StoreContext.Provider value={{ refetchJobs: refetchSpy }}>
                <RunJobModal {...props} />
            </StoreContext.Provider>
        )

        wrapper
            .find('button')
            .find({ name: 'run-job-id', type: 'button' })
            .simulate('click')

        await act(async () => {
            // Using the fix from: https://github.com/enzymejs/enzyme/issues/2073
            await resolvedPromise
            wrapper.update()
        })

        expect(mutateSpy).toHaveBeenCalled()
        expect(hideModalSpy).toHaveBeenCalled()
        expect(refetchSpy).toHaveBeenCalled()
    })
})
