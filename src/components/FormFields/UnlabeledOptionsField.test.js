import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import { useGetUnlabeledOptions } from '../../hooks/parameter-options'
import expectRenderError from '../../../test/expect-render-error'
import UnlabeledOptionsField from './UnlabeledOptionsField'

const { Form } = ReactFinalForm

jest.mock('../../hooks/parameter-options', () => ({
    useGetUnlabeledOptions: jest.fn(),
}))

describe('<UnlabeledOptionsField>', () => {
    it('shows a loading message when loading', () => {
        useGetUnlabeledOptions.mockImplementation(() => ({
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
                        <UnlabeledOptionsField {...props} />
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

        useGetUnlabeledOptions.mockReset()
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
        useGetUnlabeledOptions.mockImplementation(() => ({
            loading: false,
            error: new Error(message),
            data: null,
        }))

        expectRenderError(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <UnlabeledOptionsField {...props} />
                    </form>
                )}
            </Form>,
            message
        )

        useGetUnlabeledOptions.mockReset()
    })

    it('shows a message when there are no options', () => {
        useGetUnlabeledOptions.mockImplementation(() => ({
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
                        <UnlabeledOptionsField {...props} />
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

        useGetUnlabeledOptions.mockReset()
        wrapper.unmount()
    })

    it('renders the field when there are options', () => {
        useGetUnlabeledOptions.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: ['one', 'two'],
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
                        <UnlabeledOptionsField {...props} />
                    </form>
                )}
            </Form>
        )

        const actual = wrapper.find({ name: 'fieldName' })

        expect(actual.length > 0).toBe(true)

        useGetUnlabeledOptions.mockReset()
        wrapper.unmount()
    })
})
