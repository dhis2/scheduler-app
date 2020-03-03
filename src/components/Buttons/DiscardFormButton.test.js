import React from 'react'
import { shallow, mount } from 'enzyme'
import history from '../../services/history'
import DiscardFormButton from './DiscardFormButton'

jest.mock('../../services/history', () => ({
    push: jest.fn(),
}))

describe('<DiscardFormButton>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(
            <DiscardFormButton shouldConfirm={false}>Discard</DiscardFormButton>
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('shows the modal when it should confirm and button is clicked', () => {
        const wrapper = mount(
            <DiscardFormButton shouldConfirm>Discard</DiscardFormButton>
        )

        expect(wrapper.find('DiscardFormModal')).toHaveLength(0)

        wrapper.find('button').simulate('click')

        expect(wrapper.find('DiscardFormModal')).toHaveLength(1)
    })

    it('changes route when it should not confirm and button is clicked', () => {
        const wrapper = mount(<DiscardFormButton>Discard</DiscardFormButton>)

        wrapper.find('button').simulate('click')

        expect(history.push).toHaveBeenCalledWith('/')
    })
})
