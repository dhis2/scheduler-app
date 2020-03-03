import React from 'react'
import { shallow, mount } from 'enzyme'
import DeleteJobButton from './DeleteJobButton'

describe('<DeleteJobButton>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<DeleteJobButton id="1" />)

        expect(wrapper).toMatchSnapshot()
    })

    it('shows the modal when button is clicked', () => {
        const wrapper = mount(<DeleteJobButton id="id" />)

        expect(wrapper.find('DeleteJobModal')).toHaveLength(0)

        wrapper.find('button').simulate('click')

        expect(wrapper.find('DeleteJobModal')).toHaveLength(1)
    })
})
