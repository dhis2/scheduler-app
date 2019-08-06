import React from 'react'
import { shallow, mount } from 'enzyme'
import history from '../../services/history'
import { DumbDiscardFormButton as DiscardFormButton } from './DiscardFormButton'

describe('<DiscardFormButton>', () => {
    beforeEach(() => {
        history.push = jest.fn()
    })

    it('renders correctly', () => {
        const wrapper = shallow(
            <DiscardFormButton showModal={() => {}} shouldConfirm={false}>
                Discard
            </DiscardFormButton>
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('calls showModal correctly when clicked and it should confirm', () => {
        const showModal = jest.fn()
        const wrapper = mount(
            <DiscardFormButton showModal={showModal} shouldConfirm>
                Discard
            </DiscardFormButton>
        )

        wrapper.find('button').simulate('click')

        expect(showModal.mock.calls[0][0]).toMatchSnapshot()
    })

    it('calls history correctly when clicked and it should not confirm', () => {
        const wrapper = mount(
            <DiscardFormButton showModal={() => {}} shouldConfirm={false}>
                Discard
            </DiscardFormButton>
        )

        wrapper.find('button').simulate('click')

        expect(history.push.mock.calls[0][0]).toMatchSnapshot()
    })
})
