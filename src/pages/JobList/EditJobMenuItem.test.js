import React from 'react'
import { shallow, mount } from 'enzyme'
import history from '../../services/history'
import EditJobMenuItem from './EditJobMenuItem'

jest.mock('../../services/history', () => ({
    push: jest.fn(),
}))

describe('<EditJobMenuItem>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<EditJobMenuItem id="id" />)

        expect(wrapper).toMatchSnapshot()
    })

    it('calls history.push correctly when MenuItem is clicked', () => {
        const wrapper = mount(<EditJobMenuItem id="id" />)

        wrapper.find('a').simulate('click')

        expect(history.push).toHaveBeenCalledWith('/edit/id')
    })
})
