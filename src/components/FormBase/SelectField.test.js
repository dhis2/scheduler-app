import React from 'react'
import { shallow } from 'enzyme'
import { Help } from '@dhis2/ui-core'
import SelectField from './SelectField'

describe('<SelectField>', () => {
    it('renders correctly', () => {
        const props = {
            input: {
                value: 'value',
                onChange: () => {},
                name: 'name',
            },
            meta: {
                touched: false,
            },
            label: 'label',
        }
        const wrapper = shallow(
            <SelectField {...props}>
                <option value="option">option</option>
            </SelectField>
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('renders errors correctly', () => {
        const props = {
            input: {
                value: 'value',
                onChange: () => {},
                name: 'name',
            },
            meta: {
                touched: true,
                error: {
                    message: 'error',
                },
            },
            label: 'label',
        }
        const wrapper = shallow(
            <SelectField {...props}>
                <option value="option">option</option>
            </SelectField>
        )

        expect(wrapper.find(Help)).toHaveLength(1)
        expect(wrapper).toMatchSnapshot()
    })

    it('does not render errors if the field has not been touched', () => {
        const props = {
            input: {
                value: 'value',
                onChange: () => {},
                name: 'name',
            },
            meta: {
                touched: false,
                error: {
                    message: 'error',
                },
            },
            label: 'label',
        }
        const wrapper = shallow(
            <SelectField {...props}>
                <option value="option">option</option>
            </SelectField>
        )

        expect(wrapper.find(Help)).toHaveLength(0)
    })
})
