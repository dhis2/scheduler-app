import React from 'react'
import { shallow, mount } from 'enzyme'
import history from '../../services/history'
import EditQueueAction from './EditQueueAction'

jest.mock('../../services/history', () => ({
    push: jest.fn(),
}))

describe('<EditQueueAction>', () => {
    it('renders without errors', () => {
        shallow(<EditQueueAction name="name" />)
    })

    it('calls history.push correctly when MenuItem is clicked', () => {
        const wrapper = mount(<EditQueueAction name="name" />)

        wrapper.find('a').simulate('click')

        expect(history.push).toHaveBeenCalledWith('/queue/name')
    })
})
