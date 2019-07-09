import React from 'react'
import { shallow, mount } from 'enzyme'
import { UnconnectedDeleteJobButton as DeleteJobButton } from './DeleteJobButton'

describe('<DeleteJobButton>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(
            <DeleteJobButton id="1" isFetching={false} deleteJob={() => {}} />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('calls deleteJob when clicked', () => {
        const deleteJob = jest.fn()
        const wrapper = mount(
            <DeleteJobButton id="1" isFetching={false} deleteJob={deleteJob} />
        )

        wrapper.find('button').simulate('click')

        expect(deleteJob).toHaveBeenCalled()
    })

    it('disables itself whilst jobs are fetching', () => {
        const deleteJob = () => {}
        const wrapper = mount(
            <DeleteJobButton id="1" isFetching={true} deleteJob={deleteJob} />
        )

        const button = wrapper.find('button')

        expect(button.props().disabled).toBe(true)
    })
})
