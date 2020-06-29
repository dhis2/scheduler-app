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

        expect(loadingIndicator).toHaveLength(1)
        expect(loadingIndicator.text()).toEqual(
            expect.stringContaining('Loading')
        )

        /**
         * Umounting manually here prevents React throwing an act warning. I suspect the warning
         * is caused by the popper setting state at a point where it's not wrapped in act.
         * See here: https://github.com/popperjs/react-popper/issues/368
         * Neither wrapping mount, nor the click simulation resolves the warning, but unmounting
         * manually seems to silence it. It should be ok to do that since the popper changes
         * should only affect placement, which we're not testing here.
         */
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

        expect(actual).toEqual(expect.stringContaining('No options available'))
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

        expect(actual).toEqual(expect.stringContaining('No options available'))
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

        const actual = wrapper.find('LabeledOptionsField')

        expect(actual).toHaveLength(1)
    })
})
