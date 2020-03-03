import React from 'react'
import { shallow, mount } from 'enzyme'
import history from '../../services/history'
import DiscardFormModal from './DiscardFormModal'

jest.mock('../../services/history', () => ({
    push: jest.fn(),
}))

describe('<DiscardFormModal>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<DiscardFormModal hideModal={() => {}} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('calls hideModal when cancel button is clicked', () => {
        const spy = jest.fn()
        const wrapper = mount(<DiscardFormModal hideModal={spy} />)

        wrapper.find('button[name="cancel-discard-form"]').simulate('click')

        expect(spy).toHaveBeenCalled()
    })

    it('calls history push and hideModal when discard button is clicked', () => {
        const spy = jest.fn()
        const wrapper = mount(<DiscardFormModal hideModal={spy} />)

        wrapper.find('button[name="discard-form"]').simulate('click')

        expect(history.push).toHaveBeenCalledWith('/')
        expect(spy).toHaveBeenCalled()
    })

    it('calls hideModal when cover is clicked', () => {
        const spy = jest.fn()
        const wrapper = mount(<DiscardFormModal hideModal={spy} />)

        wrapper.find('.backdrop').simulate('click')

        expect(spy).toHaveBeenCalled()
    })
})
