import React from 'react'
import { shallow, mount } from 'enzyme'
import RunJobAction from './RunJobAction'

describe('<RunJobAction>', () => {
    it('renders without errors', () => {
        shallow(<RunJobAction id="id" />)
    })

    it('shows the modal when MenuItem is clicked', () => {
        const wrapper = mount(<RunJobAction id="id" />)

        expect(wrapper.find('RunJobModal')).toHaveLength(0)

        wrapper.find('a').simulate('click')

        expect(wrapper.find('RunJobModal')).toHaveLength(1)
    })
})
