import React from 'react'
import { shallow, mount } from 'enzyme'
import history from '../../services/history'
import DiscardFormModal from './DiscardFormModal'

jest.mock('../../services/history', () => ({
    push: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<DiscardFormModal>', () => {
    it('renders without errors', () => {
        shallow(<DiscardFormModal hideModal={() => {}} />)
    })

    it('calls hideModal when cancel button is clicked', () => {
        const spy = jest.fn()
        const wrapper = mount(<DiscardFormModal hideModal={spy} />)

        wrapper
            .find('button')
            .find({ name: 'cancel-discard-form' })
            .simulate('click')

        expect(spy).toHaveBeenCalled()
    })

    it('calls history push and hideModal when discard button is clicked', () => {
        const spy = jest.fn()
        const wrapper = mount(<DiscardFormModal hideModal={spy} />)

        wrapper.find('button').find({ name: 'discard-form' }).simulate('click')

        expect(history.push).toHaveBeenCalledWith('/')
        expect(spy).toHaveBeenCalled()
    })

    it('calls hideModal when backdrop is clicked', () => {
        const spy = jest.fn()
        const wrapper = mount(<DiscardFormModal hideModal={spy} />)

        // Not a stable selector, but the backdrop does not have a data-test attribute
        wrapper.find('.backdrop').simulate('click')

        expect(spy).toHaveBeenCalled()
    })
})
