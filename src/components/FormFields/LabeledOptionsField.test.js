import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import { StoreContext } from '../Store'
import LabeledOptionsField from './LabeledOptionsField'

const { Form } = ReactFinalForm

describe('<LabeledOptionsField>', () => {
    it('shows a message when there are no options', () => {
        const store = {
            parameterOptions: {
                parameterName: [],
            },
        }
        const props = {
            label: 'label',
            name: 'name',
            parameterName: 'parameterName',
        }
        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <Form onSubmit={() => {}}>
                    {() => (
                        <form>
                            <LabeledOptionsField {...props} />
                        </form>
                    )}
                </Form>
            </StoreContext.Provider>
        )

        const actual = wrapper
            .find({
                'data-test': 'dhis2-uiwidgets-multiselectfield-help',
            })
            .text()

        expect(actual).toEqual(expect.stringContaining('No options available'))
    })

    it('renders the field when there are options', () => {
        const store = {
            parameterOptions: {
                parameterName: [{ id: 'id', displayName: 'displayName' }],
            },
        }
        const props = {
            label: 'label',
            name: 'fieldName',
            parameterName: 'parameterName',
        }
        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <Form onSubmit={() => {}}>
                    {() => (
                        <form>
                            <LabeledOptionsField {...props} />
                        </form>
                    )}
                </Form>
            </StoreContext.Provider>
        )

        const actual = wrapper.find('LabeledOptionsField')

        expect(actual).toHaveLength(1)
    })
})
