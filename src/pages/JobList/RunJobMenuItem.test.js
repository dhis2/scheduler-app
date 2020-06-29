import React from 'react'
import { shallow, mount } from 'enzyme'
import RunJobMenuItem from './RunJobMenuItem'

describe('<RunJobMenuItem>', () => {
    it('renders without errors', () => {
        shallow(<RunJobMenuItem id="id" />)
    })

    it('shows the modal when MenuItem is clicked', () => {
        const wrapper = mount(<RunJobMenuItem id="id" />)

        expect(wrapper.find('RunJobModal')).toHaveLength(0)

        wrapper.find('a').simulate('click')

        expect(wrapper.find('RunJobModal')).toHaveLength(1)
    })
})
