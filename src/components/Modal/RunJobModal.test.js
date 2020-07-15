import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDataEngine } from '@dhis2/app-runtime'
import { RefetchJobsContext } from '../Context'
import RunJobModal from './RunJobModal'

jest.mock('@dhis2/app-runtime', () => ({
    useDataEngine: jest.fn(() => ({ query: () => () => Promise.resolve() })),
}))

describe('<RunJobModal>', () => {
    it('renders correctly', () => {
        const props = {
            id: 'id',
            hideModal: () => {},
        }
        const wrapper = shallow(<RunJobModal {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('calls hideModal when cancel button is clicked', () => {
        const props = {
            id: 'id',
            hideModal: jest.fn(),
        }
        const wrapper = mount(<RunJobModal {...props} />)

        wrapper.find('button[name="hide-modal"]').simulate('click')

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
        const querySpy = jest.fn(() => resolvedPromise)
        const refetchSpy = jest.fn()
        const hideModalSpy = jest.fn()
        const engineMock = {
            query: querySpy,
        }
        useDataEngine.mockImplementation(() => engineMock)

        const props = {
            id: 'id',
            hideModal: hideModalSpy,
        }
        const wrapper = mount(
            <RefetchJobsContext.Provider value={refetchSpy}>
                <RunJobModal {...props} />
            </RefetchJobsContext.Provider>
        )

        wrapper
            .find('button')
            .find({ name: 'run-job-id', type: 'button' })
            .simulate('click')

        await resolvedPromise

        expect(querySpy).toHaveBeenCalled()
        expect(hideModalSpy).toHaveBeenCalled()
        expect(refetchSpy).toHaveBeenCalled()
    })
})
