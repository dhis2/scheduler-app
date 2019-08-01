import React from 'react'
import { shallow } from 'enzyme'
import Switch from './Switch'

describe('<Switch>', () => {
    it('renders correctly', () => {
        const props = {
            input: {
                onChange: () => {},
                name: 'name',
            },
            label: 'label',
        }
        const wrapper = shallow(<Switch {...props} />)

        expect(wrapper).toMatchSnapshot()
    })
})
