import { mount } from 'enzyme'
import React from 'react'
import { CircularLoader, ReactFinalForm } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import AggregatedDataExchangeField from './AggregatedDataExchangeField'

const { Form } = ReactFinalForm

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

const renderComponent = ({
    useDataQueryReturnValues,
    submitHandler = () => {},
}) => {
    useDataQuery.mockReturnValue(useDataQueryReturnValues)

    return mount(
        <>
            <Form onSubmit={submitHandler}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <AggregatedDataExchangeField
                            label="Data exchange"
                            name="ADF"
                        />
                    </form>
                )}
            </Form>
        </>
    )
}

describe('<AggregatedDataExchangeField>', () => {
    describe('When loading', () => {
        it('should display the <CircularLoader />', () => {
            const wrapper = renderComponent({
                useDataQueryReturnValues: {
                    loading: true,
                    error: undefined,
                    data: undefined,
                },
            })

            expect(wrapper.find(CircularLoader).exists()).toBe(true)
        })

        it('should prevent form submission', () => {
            const submitHandler = jest.fn()

            const wrapper = renderComponent({
                useDataQueryReturnValues: {
                    loading: true,
                    error: undefined,
                    data: undefined,
                },
                submitHandler,
            })

            wrapper.find('form').simulate('submit')

            expect(submitHandler).not.toHaveBeenCalled()
        })
    })

    describe('When response is error', () => {
        const error = {
            type: 'network',
            details: {
                message: 'Here is the error message',
            },
        }

        it('should display the Error message', () => {
            const wrapper = renderComponent({
                useDataQueryReturnValues: {
                    loading: false,
                    error,
                    data: undefined,
                },
            })

            expect(
                wrapper.contains(
                    'There was a problem fetching data exchange ids'
                )
            ).toBe(true)
            expect(wrapper.contains('error type - network')).toBe(true)
            expect(wrapper.contains('Here is the error message')).toBe(true)
        })

        it('should prevent form submission', () => {
            const submitHandler = jest.fn()

            const wrapper = renderComponent({
                useDataQueryReturnValues: {
                    loading: false,
                    error,
                    data: undefined,
                },
                submitHandler,
            })

            wrapper.find('form').simulate('submit')

            expect(submitHandler).not.toHaveBeenCalled()
        })
    })

    describe('When response has data', () => {
        const data = {
            dataExchangeIds: {
                aggregateDataExchanges: [
                    {
                        displayName: 'Internal data exchange',
                        id: 'qwnWfFq0nk4',
                    },
                    {
                        displayName: 'Internal data exchange 2',
                        id: 'ZKNvLwv9ffm',
                    },
                ],
            },
        }

        // At the time of writing these tests have a problem relating to the error
        // ReferenceError: backgroundColor is not defined
        // seems to be a problem in `node_modules/@dhis2-ui/transfer/build/cjs/right-side.js`
        it.skip('should display Transfer and allow submission of ids', () => {
            const wrapper = renderComponent({
                useDataQueryReturnValues: {
                    loading: false,
                    error: undefined,
                    data,
                },
            })

            console.log(wrapper.debug())
        })

        // At the time of writing these tests have a problem relating to the error
        // ReferenceError: backgroundColor is not defined
        // seems to be a problem in `node_modules/@dhis2-ui/transfer/build/cjs/right-side.js`
        it.skip('should prevent submission if no ids are selected', () => {
            const wrapper = renderComponent({
                useDataQueryReturnValues: {
                    loading: false,
                    error: undefined,
                    data,
                },
            })

            console.log(wrapper.debug())
        })
    })
})
