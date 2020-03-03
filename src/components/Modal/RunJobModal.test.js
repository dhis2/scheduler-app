import React from 'react'
import { shallow, mount } from 'enzyme'
import RunJobModal from './RunJobModal'

describe('<RunJobModal>', () => {
    it('renders correctly', () => {
        const props = {
            id: 'id',
            hideModal: () => {},
            runJob: () => {},
        }
        const wrapper = shallow(<RunJobModal {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('calls hideModal when cancel button is clicked', () => {
        const props = {
            id: 'id',
            hideModal: jest.fn(),
            runJob: () => {},
        }
        const wrapper = mount(<RunJobModal {...props} />)

        wrapper.find('button[name="hide-modal"]').simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })

    it('calls hideModal when cover is clicked', () => {
        const props = {
            id: 'id',
            hideModal: jest.fn(),
            runJob: () => {},
        }
        const wrapper = mount(<RunJobModal {...props} />)

        wrapper.find('.backdrop').simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })
})
