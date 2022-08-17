import AggregatedDataExchangeField from './AggregatedDataExchangeField'
import { mount } from 'enzyme'
import React from 'react'
import { CircularLoader, ReactFinalForm, CssVariables } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'

const { Form } = ReactFinalForm

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

const renderComponent = ({ useDataQueryReturnValues }) => {
    useDataQuery.mockReturnValue(useDataQueryReturnValues)

    const wrapper = mount(
        <>
            <CssVariables spacers colors theme />
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <AggregatedDataExchangeField
                            label="Data exchange"
                            name="ADF"
                        />
                    </form>
                )}
            </Form>
        </>
    )

    return wrapper
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
    })

    describe('When response is error', () => {
        it('should display the Error message', () => {
            const error = {
                type: 'network',
                details: {
                    message: 'Here is the error message',
                },
            }

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

        it('should display', () => {
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
