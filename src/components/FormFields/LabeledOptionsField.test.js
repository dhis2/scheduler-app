import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import { useParameterOption } from '../../hooks/parameter-options'
import LabeledOptionsField from './LabeledOptionsField'

const { Form } = ReactFinalForm

jest.mock('../../hooks/parameter-options', () => ({
    useParameterOption: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<LabeledOptionsField>', () => {
    it('shows a message when there are no options', () => {
        useParameterOption.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: [],
        }))
        const props = {
            label: 'label',
            name: 'name',
            parameterName: 'parameterName',
        }
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <LabeledOptionsField {...props} />
                    </form>
                )}
            </Form>
        )

        const actual = wrapper
            .find({
                'data-test': 'dhis2-uiwidgets-multiselectfield-help',
            })
            .text()

        expect(actual).toEqual(expect.stringContaining('No options available'))
    })

    it('renders the field when there are options', () => {
        useParameterOption.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: [{ id: 'id', displayName: 'displayName' }],
        }))
        const props = {
            label: 'label',
            name: 'fieldName',
            parameterName: 'parameterName',
        }
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <LabeledOptionsField {...props} />
                    </form>
                )}
            </Form>
        )

        const actual = wrapper.find('LabeledOptionsField')

        expect(actual).toHaveLength(1)
    })
})
