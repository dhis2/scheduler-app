import React from 'react'
import { shallow, mount } from 'enzyme'
import DeleteJobMenuItem from './DeleteJobMenuItem'

describe('<DeleteJobMenuItem>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<DeleteJobMenuItem id="id" />)

        expect(wrapper).toMatchSnapshot()
    })

    it('shows the modal when MenuItem is clicked', () => {
        const wrapper = mount(<DeleteJobMenuItem id="id" />)

        expect(wrapper.find('DeleteJobModal')).toHaveLength(0)

        wrapper.find('a').simulate('click')

        expect(wrapper.find('DeleteJobModal')).toHaveLength(1)
    })
})
