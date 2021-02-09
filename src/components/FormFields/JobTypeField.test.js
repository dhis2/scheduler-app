import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import { StoreContext } from '../Store'
import JobTypeField from './JobTypeField'

const { Form } = ReactFinalForm

describe('<JobTypeField>', () => {
    it('shows an error that the field is required on empty values', () => {
        const store = {
            jobTypes: [{ jobType: 'ANALYTICS_TABLE' }],
        }

        const wrapper = mount(
            <StoreContext.Provider value={store}>
                <Form onSubmit={() => {}}>
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <JobTypeField />
                        </form>
                    )}
                </Form>
            </StoreContext.Provider>
        )

        // Trigger validation
        wrapper.find('form').simulate('submit')

        const actual = wrapper
            .find({
                'data-test': 'dhis2-uiwidgets-singleselectfield-validation',
            })
            .text()

        expect(actual).toEqual(
            expect.stringContaining('Please provide a value')
        )
    })
})
