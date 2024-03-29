import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import QueueEditForm from './QueueEditForm'

const { Form } = ReactFinalForm

// Mock components that make network requests
jest.mock('../FormFields/QueueOrderField', () => () => (
    <div data-test="sequence-order-field">QueueOrderField</div>
))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<QueueEditForm>', () => {
    it('shows submit errors if there are any', () => {
        const message = 'Generic submit error'
        const props = {
            name: 'name',
            handleSubmit: () => {},
            pristine: false,
            submitting: false,
            submitError: [message],
            hasSubmitErrors: true,
            values: {},
        }

        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => <QueueEditForm {...props} />}
            </Form>
        )
        const actual = wrapper.find({
            'data-test': 'dhis2-uicore-noticebox-content-message',
        })

        expect(actual).toHaveLength(1)
        expect(actual.text()).toEqual(expect.stringContaining(message))
    })

    it('shows a spinner when submitting', () => {
        const props = {
            name: 'name',
            handleSubmit: () => {},
            pristine: false,
            submitting: true,
            submitError: [],
            hasSubmitErrors: false,
            values: {},
        }

        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => <QueueEditForm {...props} />}
            </Form>
        )

        const submitButton = wrapper.find({
            'data-test': 'dhis2-uicore-button',
            type: 'submit',
        })

        const circularLoader = submitButton.find({
            'data-test': 'dhis2-uicore-circularloader',
        })
        const progressBar = submitButton.find({ role: 'progressbar' })

        expect(circularLoader).toHaveLength(1)
        expect(progressBar).toHaveLength(1)
    })

    it('disables the submit button when pristine', () => {
        const props = {
            name: 'name',
            handleSubmit: () => {},
            pristine: true,
            submitting: false,
            submitError: [],
            hasSubmitErrors: false,
            values: {},
        }

        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => <QueueEditForm {...props} />}
            </Form>
        )

        const actual = wrapper.find('button').find({
            'data-test': 'dhis2-uicore-button',
            type: 'submit',
            disabled: true,
        })

        expect(actual).toHaveLength(1)
    })

    it('disables the submit button when submitting', () => {
        const props = {
            name: 'name',
            handleSubmit: () => {},
            pristine: false,
            submitting: true,
            submitError: [],
            hasSubmitErrors: false,
            values: {},
        }

        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => <QueueEditForm {...props} />}
            </Form>
        )

        const actual = wrapper.find('button').find({
            'data-test': 'dhis2-uicore-button',
            type: 'submit',
            disabled: true,
        })

        expect(actual).toHaveLength(1)
    })
})
