import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import { StoreContext } from '../Store'
import ParameterFields from './ParameterFields'

const { Form } = ReactFinalForm

describe('<ParameterFields>', () => {
    it('returns null if there are no parameters', () => {
        const store = { jobTypes: [{ jobType: 'jobType' }] }
        const props = {
            jobType: 'jobType',
        }
        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <Form onSubmit={() => {}}>
                    {() => (
                        <form>
                            <ParameterFields {...props} />
                        </form>
                    )}
                </Form>
            </StoreContext.Provider>
        )

        const children = wrapper.find('form').children()

        expect(children.isEmptyRender()).toBe(true)
    })

    it('returns the expected component for skipTableTypes', () => {
        const store = {
            jobTypes: [
                {
                    jobType: 'jobType',
                    jobParameters: [
                        {
                            fieldName: 'fieldName',
                            name: 'skipTableTypes',
                            klass: 'klass',
                        },
                    ],
                },
            ],
            parameterOptions: {
                skipTableTypes: [],
            },
        }
        const props = {
            jobType: 'jobType',
        }
        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <Form onSubmit={() => {}}>
                    {() => (
                        <form>
                            <ParameterFields {...props} />
                        </form>
                    )}
                </Form>
            </StoreContext.Provider>
        )

        const component = wrapper.find('SkipTableTypesField')

        expect(component).toHaveLength(1)
    })

    it('returns the expected component for java.lang.String', () => {
        const store = {
            jobTypes: [
                {
                    jobType: 'jobType',
                    jobParameters: [
                        {
                            fieldName: 'fieldName',
                            name: 'name',
                            klass: 'java.lang.String',
                        },
                    ],
                },
            ],
        }
        const props = {
            jobType: 'jobType',
        }
        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <Form onSubmit={() => {}}>
                    {() => (
                        <form>
                            <ParameterFields {...props} />
                        </form>
                    )}
                </Form>
            </StoreContext.Provider>
        )

        const component = wrapper.find('InputFieldFF')

        expect(component).toHaveLength(1)
    })

    it('returns the expected component for java.lang.Boolean', () => {
        const store = {
            jobTypes: [
                {
                    jobType: 'jobType',
                    jobParameters: [
                        {
                            fieldName: 'fieldName',
                            name: 'name',
                            klass: 'java.lang.Boolean',
                        },
                    ],
                },
            ],
        }
        const props = {
            jobType: 'jobType',
        }
        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <Form onSubmit={() => {}}>
                    {() => (
                        <form>
                            <ParameterFields {...props} />
                        </form>
                    )}
                </Form>
            </StoreContext.Provider>
        )

        const component = wrapper.find('SwitchFieldFF')

        expect(component).toHaveLength(1)
    })

    it('returns the expected component for java.lang.Integer', () => {
        const store = {
            jobTypes: [
                {
                    jobType: 'jobType',
                    jobParameters: [
                        {
                            fieldName: 'fieldName',
                            name: 'name',
                            klass: 'java.lang.Integer',
                        },
                    ],
                },
            ],
        }
        const props = {
            jobType: 'jobType',
        }
        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <Form onSubmit={() => {}}>
                    {() => (
                        <form>
                            <ParameterFields {...props} />
                        </form>
                    )}
                </Form>
            </StoreContext.Provider>
        )

        const component = wrapper.find('InputFieldFF')

        expect(component).toHaveLength(1)
    })

    it('returns the expected component for java.util.List', () => {
        const store = {
            jobTypes: [
                {
                    jobType: 'jobType',
                    jobParameters: [
                        {
                            fieldName: 'fieldName',
                            name: 'parameterName',
                            klass: 'java.util.List',
                        },
                    ],
                },
            ],
            parameterOptions: {
                parameterName: [{ id: 'id', displayName: 'displayName' }],
            },
        }
        const props = {
            jobType: 'jobType',
        }
        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <Form onSubmit={() => {}}>
                    {() => (
                        <form>
                            <ParameterFields {...props} />
                        </form>
                    )}
                </Form>
            </StoreContext.Provider>
        )

        const component = wrapper.find('LabeledOptionsField')

        expect(component).toHaveLength(1)
    })
})
