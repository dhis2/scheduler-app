import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDeleteJob } from '../../hooks/jobs'
import { RefetchJobsContext } from '../Context'
import DeleteJobModal from './DeleteJobModal'

jest.mock('../../hooks/jobs', () => ({
    useDeleteJob: jest.fn(() => [() => {}]),
}))

describe('<DeleteJobModal>', () => {
    it('renders correctly', () => {
        const props = {
            id: 'id',
            hideModal: () => {},
        }
        const wrapper = shallow(<DeleteJobModal {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('calls hideModal when cancel button is clicked', () => {
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

        useDeleteJob.mockImplementationOnce(() => [deleteJobSpy])

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
        const props = {
            id: 'id',
            hideModal: jest.fn(),
        }
        const wrapper = mount(<DeleteJobModal {...props} />)

        wrapper.find('div[data-test="dhis2-uicore-layer"]').simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })
})
