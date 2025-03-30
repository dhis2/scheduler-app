import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import NameField from './NameField'

const { Form } = ReactFinalForm

describe('<NameField>', () => {
    it('shows an error that the field is required on empty values', () => {
        const expected = 'Please provide a value'
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <NameField />
                    </form>
                )}
            </Form>
        )

        // Trigger validation
        wrapper.find('form').simulate('submit')

        const actual = wrapper
            .find({ 'data-test': 'dhis2-uiwidgets-inputfield-validation' })
            .text()

        expect(actual).toEqual(expect.stringMatching(expected))
    })

    it('does not allow naming a queue "Add"', () => {
        const expected = 'Queues can\'t be named "Add" or "add"'
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <NameField isQueue />
                    </form>
                )}
            </Form>
        )

        wrapper
            .find('input[name="name"]')
            .simulate('change', { target: { value: 'Add' } })

        // Trigger validation
        wrapper.find('form').simulate('submit')

        const actual = wrapper
            .find({ 'data-test': 'dhis2-uiwidgets-inputfield-validation' })
            .text()

        expect(actual).toEqual(expect.stringMatching(expected))
    })

    it('does not allow naming a queue "add"', () => {
        const expected = 'Queues can\'t be named "Add" or "add"'
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <NameField isQueue />
                    </form>
                )}
            </Form>
        )

        wrapper
            .find('input[name="name"]')
            .simulate('change', { target: { value: 'add' } })

        // Trigger validation
        wrapper.find('form').simulate('submit')

        const actual = wrapper
            .find({ 'data-test': 'dhis2-uiwidgets-inputfield-validation' })
            .text()

        expect(actual).toEqual(expect.stringMatching(expected))
    })
})
