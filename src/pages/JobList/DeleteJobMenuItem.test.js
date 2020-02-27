import React from 'react'
import { shallow, mount } from 'enzyme'
import { DumbDeleteJobMenuItem } from './DeleteJobMenuItem'

describe('<DeleteJobMenuItem>', () => {
    it('renders correctly', () => {
        const props = {
            id: 'id',
            showModal: () => {},
        }
        const wrapper = shallow(<DumbDeleteJobMenuItem {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('calls showModal when MenuItem is clicked', () => {
        const props = {
            id: 'id',
            showModal: jest.fn(),
        }
        const wrapper = mount(<DumbDeleteJobMenuItem {...props} />)

        wrapper.find('a').simulate('click')

        expect(props.showModal).toHaveBeenCalled()
    })
})
