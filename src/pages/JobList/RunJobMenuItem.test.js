import React from 'react'
import { shallow, mount } from 'enzyme'
import RunJobMenuItem from './RunJobMenuItem'

describe('<RunJobMenuItem>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<RunJobMenuItem id="id" />)

        expect(wrapper).toMatchSnapshot()
    })

    it('shows the modal when MenuItem is clicked', () => {
        const wrapper = mount(<RunJobMenuItem id="id" />)

        expect(wrapper.find('RunJobModal')).toHaveLength(0)

        wrapper.find('a').simulate('click')

        expect(wrapper.find('RunJobModal')).toHaveLength(1)
    })
})
