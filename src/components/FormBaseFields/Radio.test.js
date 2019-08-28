import React from 'react'
import { shallow } from 'enzyme'
import Radio from './Radio'

describe('<Radio>', () => {
    it('renders correctly', () => {
        const props = {
            input: {
                onChange: () => {},
                name: 'name',
                value: 'value',
            },
            label: 'label',
        }
        const wrapper = shallow(<Radio {...props} />)

        expect(wrapper).toMatchSnapshot()
    })
})
