import React from 'react'
import { shallow, mount } from 'enzyme'
import DeleteJobAction from './DeleteJobAction'

describe('<DeleteJobAction>', () => {
    it('renders without errors', () => {
        shallow(<DeleteJobAction id="id" onSuccess={() => {}} />)
    })

    it('shows the modal when MenuItem is clicked', () => {
        const wrapper = mount(<DeleteJobAction id="id" onSuccess={() => {}} />)

        expect(wrapper.find('DeleteJobModal')).toHaveLength(0)

        wrapper.find('a').simulate('click')

        expect(wrapper.find('DeleteJobModal')).toHaveLength(1)
    })
})
