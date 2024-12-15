import React from 'react'
import { shallow } from 'enzyme'
import Store from './Store.jsx'

describe('<Store>', () => {
    it('renders the children', () => {
        const wrapper = shallow(<Store>Child</Store>)

        expect(wrapper.text()).toEqual(expect.stringContaining('Child'))
    })
})
