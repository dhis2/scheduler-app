import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import { useJobTypeParameters } from '../../hooks/job-types'
import { useParameterOption } from '../../hooks/parameter-options'
import ParameterFields from './ParameterFields'

const { Form } = ReactFinalForm

jest.mock('../../hooks/job-types', () => ({
    useJobTypeParameters: jest.fn(),
}))

jest.mock('../../hooks/parameter-options', () => ({
    useParameterOption: jest.fn(),
}))

describe('<ParameterFields>', () => {
    it('returns null if there are no parameters', () => {
        useJobTypeParameters.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: [],
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
    })

    it('returns the expected component for skipTableTypes', () => {
        useParameterOption.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: [],
        }))
        useJobTypeParameters.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: [
                {
                    fieldName: 'fieldName',
                    name: 'skipTableTypes',
                    klass: 'klass',
                },
            ],
        }))
        const props = {
            jobType: 'skipTableTypes',
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

        const component = wrapper.find('SkipTableTypesField')

        expect(component).toHaveLength(1)
    })

    it('returns the expected component for java.lang.String', () => {
        useJobTypeParameters.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: [
                {
                    fieldName: 'fieldName',
                    name: 'name',
                    klass: 'java.lang.String',
                },
            ],
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

        expect(component).toHaveLength(1)
    })

    it('returns the expected component for java.lang.Boolean', () => {
        useJobTypeParameters.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: [
                {
                    fieldName: 'fieldName',
                    name: 'name',
                    klass: 'java.lang.Boolean',
                },
            ],
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

        expect(component).toHaveLength(1)
    })

    it('returns the expected component for java.lang.Integer', () => {
        useJobTypeParameters.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: [
                {
                    fieldName: 'fieldName',
                    name: 'name',
                    klass: 'java.lang.Integer',
                },
            ],
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

        expect(component).toHaveLength(1)
    })

    it('returns the expected component for java.util.List', () => {
        useJobTypeParameters.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: [
                {
                    fieldName: 'fieldName',
                    name: 'parameterName',
                    klass: 'java.util.List',
                },
            ],
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

        const component = wrapper.find('LabeledOptionsField')

        expect(component).toHaveLength(1)
    })
})
