import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import JobNameField from './JobNameField'

const { Form } = ReactFinalForm

describe('<JobNameField>', () => {
    it('shows an error that the field is required on empty values', () => {
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <JobNameField />
                    </form>
                )}
            </Form>
        )

        // Trigger validation
        wrapper.find('form').simulate('submit')

        const actual = wrapper
            .find({ 'data-test': 'dhis2-uiwidgets-inputfield-validation' })
            .text()

        expect(actual).toBe('Please provide a value')

        wrapper.unmount()
    })
})
