import React from 'react'
import { shallow, mount } from 'enzyme'
import EditJobMenuItem from './EditJobMenuItem'

beforeEach(() => {
    jest.resetModules()
})

describe('<EditJobMenuItem>', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<EditJobMenuItem id="id" />)

        expect(wrapper).toMatchSnapshot()
    })

    it('calls history.push correctly when MenuItem is clicked', () => {
        const spy = jest.fn()
        jest.doMock('../../services/history', () => ({
            push: spy,
        }))
        const EditJobMenuItem = require('./EditJobMenuItem').default
        const wrapper = mount(<EditJobMenuItem id="id" />)

        wrapper.find('a').simulate('click')

        expect(spy).toHaveBeenCalledWith('/edit/id')
    })
})
