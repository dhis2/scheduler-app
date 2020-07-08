import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import DelayField from './DelayField'

const { Form } = ReactFinalForm

describe('<DelayField>', () => {
    it('converts a supplied number value to a string', () => {
        const initialValues = {
            delay: 20,
        }
        const wrapper = mount(
            <Form onSubmit={() => {}} initialValues={initialValues}>
                {() => (
                    <form>
                        <DelayField />
                    </form>
                )}
            </Form>
        )

        const actual = wrapper.find(`input[name="delay"]`).props().value

        expect(typeof actual).toBe('string')
        wrapper.unmount()
    })

    it('shows an error for a delay that is too low', () => {
        const delay = '0'
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <DelayField />
                    </form>
                )}
            </Form>
        )

        wrapper
            .find('input[name="delay"]')
            .simulate('change', { target: { value: delay } })
            .simulate('blur')

        const actual = wrapper
            .find('p[data-test="dhis2-uiwidgets-inputfield-validation"]')
            .text()

        expect(actual).toBe('Number cannot be less than 1 or more than 86400')
        wrapper.unmount()
    })

    it('shows an error for a delay that is too high', () => {
        const delay = '86401'
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <DelayField />
                    </form>
                )}
            </Form>
        )

        wrapper
            .find('input[name="delay"]')
            .simulate('change', { target: { value: delay } })
            .simulate('blur')

        const actual = wrapper
            .find('p[data-test="dhis2-uiwidgets-inputfield-validation"]')
            .text()

        expect(actual).toBe('Number cannot be less than 1 or more than 86400')
        wrapper.unmount()
    })

    it('does not show an error for a valid delay', () => {
        const delay = '10'
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <DelayField />
                    </form>
                )}
            </Form>
        )

        wrapper
            .find('input[name="delay"]')
            .simulate('change', { target: { value: delay } })
            .simulate('blur')

        const actual = wrapper.find(
            'p[data-test="dhis2-uiwidgets-inputfield-validation"]'
        )

        expect(actual.length).toBe(0)
        wrapper.unmount()
    })

    it('shows an error that the field is required on change to empty string', () => {
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <DelayField />
                    </form>
                )}
            </Form>
        )

        wrapper
            .find('input[name="delay"]')
            .simulate('change', { target: { value: '' } })
            .simulate('blur')

        const actual = wrapper
            .find('p[data-test="dhis2-uiwidgets-inputfield-validation"]')
            .text()

        expect(actual).toBe('Please provide a value')
        wrapper.unmount()
    })
})
