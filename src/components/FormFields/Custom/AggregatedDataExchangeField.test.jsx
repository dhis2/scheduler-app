import { mount } from 'enzyme'
import React from 'react'
import { CircularLoader, ReactFinalForm } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import AggregatedDataExchangeField from './AggregatedDataExchangeField'

const { Form } = ReactFinalForm

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

describe('<AggregatedDataExchangeField>', () => {
    describe('When loading', () => {
        it('should display the <CircularLoader />', () => {
            useDataQuery.mockReturnValue({
                loading: true,
                error: undefined,
                data: undefined,
            })

            const wrapper = mount(
                <Form onSubmit={() => {}}>
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <AggregatedDataExchangeField
                                label="Data exchange"
                                name="ADF"
                            />
                        </form>
                    )}
                </Form>
            )

            expect(wrapper.find(CircularLoader).exists()).toBe(true)
        })

        it('should prevent form submission', () => {
            const submitHandler = jest.fn()
            useDataQuery.mockReturnValue({
                loading: true,
                error: undefined,
                data: undefined,
            })

            const wrapper = mount(
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
            )

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
            useDataQuery.mockReturnValue({
                loading: false,
                error,
                data: undefined,
            })

            const wrapper = mount(
                <Form onSubmit={() => {}}>
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <AggregatedDataExchangeField
                                label="Data exchange"
                                name="ADF"
                            />
                        </form>
                    )}
                </Form>
            )

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
            useDataQuery.mockReturnValue({
                loading: false,
                error,
                data: undefined,
            })

            const wrapper = mount(
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
            )

            wrapper.find('form').simulate('submit')

            expect(submitHandler).not.toHaveBeenCalled()
        })
    })
})
