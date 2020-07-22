import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import expectRenderError from '../../../test/expect-render-error'
import LabeledOptionsField from './LabeledOptionsField'

const { Form } = ReactFinalForm

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<LabeledOptionsField>', () => {
    it('shows a loading message when loading', () => {
        useDataQuery.mockImplementation(() => ({
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
    })

    it('throws errors it encounters during fetching', () => {
        const message = 'Something went wrong'
        const props = {
            endpoint: 'endpoint',
            label: 'label',
            name: 'name',
            parameterName: 'parameterName',
        }
        useDataQuery.mockImplementation(() => ({
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
    })

    it('shows a message when there is no parameterName field', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: { options: {} },
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
    })

    it('shows a message when there are no options', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: { options: { parameterName: [] } },
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
    })

    it('renders the field when there are options', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {
                options: {
                    parameterName: [{ id: 'id', displayName: 'displayName' }],
                },
            },
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
    })
})
