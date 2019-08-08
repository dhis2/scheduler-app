import React from 'react'
import { shallow, mount } from 'enzyme'
import RadioGroup from './RadioGroup'

describe('<RadioGroup>', () => {
    it('renders correctly', () => {
        const props = {
            options: [
                {
                    value: 'one',
                    label: 'one',
                },
                {
                    value: 'two',
                    label: 'two',
                },
            ],
            name: 'name',
            selected: '',
            setSelected: () => {},
        }
        const wrapper = shallow(<RadioGroup {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('calls setSelected when a radio button is clicked', () => {
        const props = {
            options: [
                {
                    value: 'one',
                    label: 'one',
                },
            ],
            name: 'name',
            selected: '',
            setSelected: jest.fn(),
        }
        const wrapper = mount(<RadioGroup {...props} />)

        wrapper
            .find('input')
            .simulate('change', { target: { value: 'change' } })

        expect(props.setSelected).toHaveBeenCalledWith('change')
    })

    it('checks the radio button if its value matches selected', () => {
        const props = {
            options: [
                {
                    value: 'one',
                    label: 'one',
                },
            ],
            name: 'name',
            selected: 'one',
            setSelected: () => {},
        }
        const wrapper = mount(<RadioGroup {...props} />)

        const input = wrapper.find('input')

        expect(input.props().checked).toEqual(true)
    })
})
