import React from 'react'
import { shallow, mount } from 'enzyme'
import DeleteJobButton from './DeleteJobButton'

describe('<DeleteJobButton>', () => {
    it('renders without errors', () => {
        shallow(<DeleteJobButton id="1" onSuccess={() => {}} />)
    })

    it('shows the modal when button is clicked', () => {
        const wrapper = mount(<DeleteJobButton id="id" onSuccess={() => {}} />)

        expect(wrapper.find('DeleteJobModal')).toHaveLength(0)

        wrapper.find('button').simulate('click')

        expect(wrapper.find('DeleteJobModal')).toHaveLength(1)
    })
})
