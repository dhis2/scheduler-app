import React from 'react'
import { shallow, mount } from 'enzyme'
import { DumbRunJobMenuItem } from './RunJobMenuItem'

describe('<RunJobMenuItem>', () => {
    it('renders correctly', () => {
        const props = {
            id: 'id',
            showModal: () => {},
        }
        const wrapper = shallow(<DumbRunJobMenuItem {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('calls showModal when MenuItem is clicked', () => {
        const props = {
            id: 'id',
            showModal: jest.fn(),
        }
        const wrapper = mount(<DumbRunJobMenuItem {...props} />)

        wrapper.find('a').simulate('click')

        expect(props.showModal).toHaveBeenCalled()
    })
})
