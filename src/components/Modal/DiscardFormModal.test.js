import React from 'react'
import { shallow, mount } from 'enzyme'
import history from '../../services/history'
import { UnconnectedDiscardFormModal as DiscardFormModal } from './DiscardFormModal'

describe('<DiscardFormModal>', () => {
    beforeEach(() => {
        history.push = jest.fn()
    })

    it('renders correctly', () => {
        const props = {
            hideModal: () => {},
            children: 'Discard',
        }
        const wrapper = shallow(<DiscardFormModal {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('calls hideModal when cancel button is clicked', () => {
        const props = {
            hideModal: jest.fn(),
            children: 'Discard',
        }
        const wrapper = mount(<DiscardFormModal {...props} />)

        wrapper.find('button[name="cancel-discard-form"]').simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })

    it('calls history push and hideModal when discard button is clicked', () => {
        const props = {
            hideModal: jest.fn(),
            children: 'Discard',
        }
        const wrapper = mount(<DiscardFormModal {...props} />)

        wrapper.find('button[name="discard-form"]').simulate('click')

        expect(history.push).toHaveBeenCalledWith('/')
        expect(props.hideModal).toHaveBeenCalled()
    })

    it('calls hideModal when cover is clicked', () => {
        const props = {
            hideModal: jest.fn(),
            children: 'Discard',
        }
        const wrapper = mount(<DiscardFormModal {...props} />)

        wrapper.find('.backdrop').simulate('click')

        expect(props.hideModal).toHaveBeenCalled()
    })
})
