import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import CronField from './CronField'

const { Form } = ReactFinalForm

describe('<CronField>', () => {
    it('shows a human readable schedule if a cron expression exists', () => {
        const cronExpression = '0 0 * ? * *'

        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <CronField />
                    </form>
                )}
            </Form>
        )

        wrapper
            .find('input[name="cronExpression"]')
            .simulate('change', { target: { value: cronExpression } })

        const actual = wrapper
            .find({ 'data-test': 'dhis2-uiwidgets-inputfield-help' })
            .text()

        expect(actual).toEqual(expect.stringContaining('Every hour'))
    })

    it('does not show an error for valid cron expressions', () => {
        const cronExpression = '0 0 * ? * *'

        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <CronField />
                    </form>
                )}
            </Form>
        )

        wrapper
            .find('input[name="cronExpression"]')
            .simulate('change', { target: { value: cronExpression } })
            .simulate('blur')

        const actual = wrapper.find({
            'data-test': 'dhis2-uiwidgets-inputfield-validation',
        })

        expect(actual).toHaveLength(0)
    })

    it('shows an error for invalid cronExpressions', () => {
        const cronExpression = 'not a cron expression'
        const expected = 'Please enter a valid CRON expression'

        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <CronField />
                    </form>
                )}
            </Form>
        )

        wrapper
            .find('input[name="cronExpression"]')
            .simulate('change', { target: { value: cronExpression } })
            .simulate('blur')

        const actual = wrapper
            .find({ 'data-test': 'dhis2-uiwidgets-inputfield-validation' })
            .text()

        expect(actual).toEqual(expect.stringMatching(expected))
    })

    it('shows an error that the field is required on empty values', () => {
        const expected = 'A CRON expression is required'
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <CronField />
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
})
