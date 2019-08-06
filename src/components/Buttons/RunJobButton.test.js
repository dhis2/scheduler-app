import React from 'react'
import { shallow, mount } from 'enzyme'
import { DumbRunJobButton as RunJobButton } from './RunJobButton'

describe('<RunJobButton>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(
            <RunJobButton id="1" isFetching={false} showModal={() => {}} />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('calls showModal correctly when clicked', () => {
        const showModal = jest.fn()
        const wrapper = mount(
            <RunJobButton id="1" isFetching={false} showModal={showModal} />
        )

        wrapper.find('button').simulate('click')

        expect(showModal.mock.calls[0][0]).toMatchSnapshot()
    })

    it('disables itself whilst jobs are fetching', () => {
        const showModal = () => {}
        const wrapper = mount(
            <RunJobButton id="1" isFetching={true} showModal={showModal} />
        )

        const button = wrapper.find('button')

        expect(button.props().disabled).toBe(true)
    })
})
