import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import { useGetLabeledOptions } from '../../hooks/parameter-options'
import expectRenderError from '../../../test/expect-render-error'
import LabeledOptionsField from './LabeledOptionsField'

const { Form } = ReactFinalForm

jest.mock('../../hooks/parameter-options', () => ({
    useGetLabeledOptions: jest.fn(),
}))

describe('<LabeledOptionsField>', () => {
    it('shows a loading message when loading', () => {
        useGetLabeledOptions.mockImplementation(() => ({
            loading: true,
            error: undefined,
            data: null,
        }))
        const props = {
            endpoint: 'endpoint',
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

        // Open menu
        wrapper
            .find({ 'data-test': 'dhis2-uicore-select-input' })
            .simulate('click')

        const loadingIndicator = wrapper.find({
            'data-test': 'dhis2-uicore-multiselect-loading',
        })

        expect(loadingIndicator.length).toBe(1)
        expect(loadingIndicator.text().includes('Loading')).toBe(true)

        useGetLabeledOptions.mockReset()
        wrapper.unmount()
    })

    it('throws errors it encounters during fetching', () => {
        const message = 'Something went wrong'
        const props = {
            endpoint: 'endpoint',
            label: 'label',
            name: 'name',
            parameterName: 'parameterName',
        }
        useGetLabeledOptions.mockImplementation(() => ({
            loading: false,
            error: new Error(message),
            data: null,
        }))

        expectRenderError(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <LabeledOptionsField {...props} />
                    </form>
                )}
            </Form>,
            message
        )

        useGetLabeledOptions.mockReset()
    })

    it('shows a message when there are no options', () => {
        useGetLabeledOptions.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: [],
        }))
        const props = {
            endpoint: 'endpoint',
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

        expect(actual.includes('No options available')).toBe(true)

        useGetLabeledOptions.mockReset()
        wrapper.unmount()
    })

    it('renders the field when there are options', () => {
        useGetLabeledOptions.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: [{ id: 'id', displayName: 'displayName' }],
        }))
        const props = {
            endpoint: 'endpoint',
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

        const actual = wrapper.find({ name: 'fieldName' })

        expect(actual.length > 0).toBe(true)

        useGetLabeledOptions.mockReset()
        wrapper.unmount()
    })
})
