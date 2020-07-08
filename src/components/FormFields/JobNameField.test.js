import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import JobNameField from './JobNameField'

const { Form } = ReactFinalForm

describe('<JobNameField>', () => {
    it('shows an error that the field is required on change to empty string', () => {
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <JobNameField />
                    </form>
                )}
            </Form>
        )

        wrapper
            .find('input[name="name"]')
            .simulate('change', { target: { value: '' } })
            .simulate('blur')

        const actual = wrapper
            .find('p[data-test="dhis2-uiwidgets-inputfield-validation"]')
            .text()

        expect(actual).toBe('Please provide a value')
        wrapper.unmount()
    })
})
