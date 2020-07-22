import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDataMutation } from '@dhis2/app-runtime'
import { RefetchJobsContext } from '../Context'
import DeleteJobModal from './DeleteJobModal'

jest.mock('@dhis2/app-runtime', () => ({
    useDataMutation: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<DeleteJobModal>', () => {
    it('renders correctly', () => {
        useDataMutation.mockImplementation(() => [() => {}])

        const props = {
            id: 'id',
            hideModal: () => {},
        }
        const wrapper = shallow(<DeleteJobModal {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('calls hideModal when cancel button is clicked', () => {
        useDataMutation.mockImplementation(() => [() => {}])

        const props = {
            id: 'id',
            hideModal: jest.fn(),
        }
        const wrapper = mount(<DeleteJobModal {...props} />)

        wrapper.find('button[name="hide-modal"]').simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })

    it('calls deleteJob, refetch and hideModal when delete button is clicked', async () => {
        const deletion = Promise.resolve()
        const deleteJobSpy = jest.fn(() => deletion)
        const refetchSpy = jest.fn(() => {})
        const hideModalSpy = jest.fn(() => {})
        const props = {
            id: 'id',
            hideModal: hideModalSpy,
        }

        useDataMutation.mockImplementation(() => [deleteJobSpy])

        const wrapper = mount(
            <RefetchJobsContext.Provider value={refetchSpy}>
                <DeleteJobModal {...props} />
            </RefetchJobsContext.Provider>
        )

        wrapper.find('button[name="delete-job-id"]').simulate('click')

        await deletion

        expect(deleteJobSpy).toHaveBeenCalledWith({ id: 'id' })
        expect(hideModalSpy).toHaveBeenCalled()
        expect(refetchSpy).toHaveBeenCalled()
    })

    it('calls hideModal when cover is clicked', () => {
        useDataMutation.mockImplementation(() => [() => {}])

        const props = {
            id: 'id',
            hideModal: jest.fn(),
        }
        const wrapper = mount(<DeleteJobModal {...props} />)

        wrapper.find('div[data-test="dhis2-uicore-layer"]').simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })
})
