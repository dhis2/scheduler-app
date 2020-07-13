import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import expectRenderError from '../../../test/expect-render-error'
import ParameterFields from './ParameterFields'

const { Form } = ReactFinalForm

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

// Use mocks here, to prevent these components from making network requests
jest.mock('./LabeledOptionsField', () => () => 'LabeledOptionsField')
jest.mock('./UnlabeledOptionsField', () => () => 'UnlabeledOptionsField')

describe('<ParameterFields>', () => {
    it('returns null when loading', () => {
        useDataQuery.mockImplementation(() => ({
            loading: true,
            error: undefined,
            data: null,
        }))
        const props = {
            jobType: 'jobType',
        }
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <ParameterFields {...props} />
                    </form>
                )}
            </Form>
        )

        const children = wrapper.find('form').children()

        expect(children.isEmptyRender()).toBe(true)

        useDataQuery.mockReset()
        wrapper.unmount()
    })

    it('throws errors it encounters during fetching', () => {
        const message = 'Something went wrong'
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: new Error(message),
            data: null,
        }))
        const props = {
            jobType: 'jobType',
        }
        expectRenderError(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <ParameterFields {...props} />
                    </form>
                )}
            </Form>,
            message
        )

        useDataQuery.mockReset()
    })

    it('returns null if there are no parameters', () => {
        const data = { jobTypes: { jobTypes: [{ jobType: 'jobType' }] } }
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data,
        }))
        const props = {
            jobType: 'jobType',
        }
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <ParameterFields {...props} />
                    </form>
                )}
            </Form>
        )

        const children = wrapper.find('form').children()

        expect(children.isEmptyRender()).toBe(true)

        useDataQuery.mockReset()
        wrapper.unmount()
    })

    it('returns the expected component for java.lang.String', () => {
        const data = {
            jobTypes: {
                jobTypes: [
                    {
                        jobType: 'jobType',
                        jobParameters: [
                            {
                                fieldName: 'fieldName',
                                name: 'name',
                                klass: 'java.lang.String',
                                relativeApiEndpoint: 'relativeApiEndpoint',
                            },
                        ],
                    },
                ],
            },
        }
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data,
        }))
        const props = {
            jobType: 'jobType',
        }
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <ParameterFields {...props} />
                    </form>
                )}
            </Form>
        )

        const component = wrapper.find('InputFieldFF')

        expect(component.length > 0).toBe(true)

        useDataQuery.mockReset()
    })

    it('returns the expected component for java.lang.Boolean', () => {
        const data = {
            jobTypes: {
                jobTypes: [
                    {
                        jobType: 'jobType',
                        jobParameters: [
                            {
                                fieldName: 'fieldName',
                                name: 'name',
                                klass: 'java.lang.Boolean',
                                relativeApiEndpoint: 'relativeApiEndpoint',
                            },
                        ],
                    },
                ],
            },
        }
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data,
        }))
        const props = {
            jobType: 'jobType',
        }
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <ParameterFields {...props} />
                    </form>
                )}
            </Form>
        )

        const component = wrapper.find('SwitchFieldFF')

        expect(component.length > 0).toBe(true)

        useDataQuery.mockReset()
    })

    it('returns the expected component for java.lang.Integer', () => {
        const data = {
            jobTypes: {
                jobTypes: [
                    {
                        jobType: 'jobType',
                        jobParameters: [
                            {
                                fieldName: 'fieldName',
                                name: 'name',
                                klass: 'java.lang.Integer',
                                relativeApiEndpoint: 'relativeApiEndpoint',
                            },
                        ],
                    },
                ],
            },
        }
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data,
        }))
        const props = {
            jobType: 'jobType',
        }
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <ParameterFields {...props} />
                    </form>
                )}
            </Form>
        )

        const component = wrapper.find('InputFieldFF')

        expect(component.length > 0).toBe(true)

        useDataQuery.mockReset()
    })

    it('returns the expected component for java.util.Set', () => {
        const data = {
            jobTypes: {
                jobTypes: [
                    {
                        jobType: 'jobType',
                        jobParameters: [
                            {
                                fieldName: 'fieldName',
                                name: 'name',
                                klass: 'java.util.Set',
                                relativeApiEndpoint: 'relativeApiEndpoint',
                            },
                        ],
                    },
                ],
            },
        }
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data,
        }))
        const props = {
            jobType: 'jobType',
        }
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <ParameterFields {...props} />
                    </form>
                )}
            </Form>
        )

        const text = wrapper.text()

        expect(text.includes('UnlabeledOptionsField')).toBe(true)

        useDataQuery.mockReset()
    })

    it('returns the expected component for java.util.List', () => {
        const data = {
            jobTypes: {
                jobTypes: [
                    {
                        jobType: 'jobType',
                        jobParameters: [
                            {
                                fieldName: 'fieldName',
                                name: 'name',
                                klass: 'java.util.List',
                                relativeApiEndpoint: 'relativeApiEndpoint',
                            },
                        ],
                    },
                ],
            },
        }
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data,
        }))
        const props = {
            jobType: 'jobType',
        }
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <ParameterFields {...props} />
                    </form>
                )}
            </Form>
        )

        const text = wrapper.text()

        expect(text.includes('LabeledOptionsField')).toBe(true)

        useDataQuery.mockReset()
    })
})
