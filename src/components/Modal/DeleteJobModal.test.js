import React from 'react'
import { shallow, mount } from 'enzyme'
import { DumbDeleteJobModal as DeleteJobModal } from './DeleteJobModal'

describe('<DeleteJobModal>', () => {
    it('renders correctly', () => {
        const props = {
            id: 'id',
            hideModal: () => {},
            deleteJob: () => {},
        }
        const wrapper = shallow(<DeleteJobModal {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('calls hideModal when cancel button is clicked', () => {
        const props = {
            id: 'id',
            hideModal: jest.fn(),
            deleteJob: () => {},
        }
        const wrapper = mount(<DeleteJobModal {...props} />)

        wrapper.find('button[name="hide-modal"]').simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })

    it('calls deleteJob and hideModal when delete button is clicked', () => {
        const props = {
            id: 'id',
            hideModal: jest.fn(),
            deleteJob: jest.fn(),
        }
        const wrapper = mount(<DeleteJobModal {...props} />)

        wrapper.find('button[name="delete-job-id"]').simulate('click')

        expect(props.deleteJob).toHaveBeenCalledWith('id')
        expect(props.hideModal).toHaveBeenCalled()
    })

    it('calls hideModal when cover is clicked', () => {
        const props = {
            id: 'id',
            hideModal: jest.fn(),
            deleteJob: () => {},
        }
        const wrapper = mount(<DeleteJobModal {...props} />)

        wrapper.find('.backdrop').simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })
})
