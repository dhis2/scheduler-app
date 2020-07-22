import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import { fieldNames } from '../FormFields'
import JobForm from './JobForm'

const { Form } = ReactFinalForm

// Mock components that make network requests
jest.mock('../FormFields/JobTypeField', () => () => (
    <div data-test="job-type-field">JobTypeField</div>
))
jest.mock('../FormFields/ScheduleField', () => () => (
    <div data-test="schedule-field">ScheduleField</div>
))
jest.mock('../FormFields/ParameterFields', () => () => (
    <div data-test="parameter-fields">ParameterFields</div>
))

describe('<JobForm>', () => {
    it('shows submit errors if there are any', () => {
        const message = 'Generic submit error'
        const props = {
            handleSubmit: () => {},
            pristine: false,
            submitting: false,
            submitError: [message],
            hasSubmitErrors: true,
            values: {},
            setIsPristine: () => {},
        }

        const wrapper = mount(
            <Form onSubmit={() => {}}>{() => <JobForm {...props} />}</Form>
        )
        const actual = wrapper.find({
            'data-test': 'dhis2-uicore-noticebox-message',
        })

        expect(actual.length > 0).toBe(true)
        expect(actual.text().includes(message)).toBe(true)

        wrapper.unmount()
    })

    it('calls setIsPristine on form changes', () => {
        const spy = jest.fn()
        const wrapper = mount(
            <Form onSubmit={() => {}} setIsPristine={spy} component={JobForm} />
        )

        wrapper
            .find({ id: 'name' })
            .simulate('change', { target: { value: 'A change' } })

        expect(spy).toHaveBeenCalledWith(false)

        wrapper.unmount()
    })

    it('shows a spinner when submitting', () => {
        const props = {
            handleSubmit: () => {},
            pristine: false,
            submitting: true,
            submitError: [],
            hasSubmitErrors: false,
            values: {},
            setIsPristine: () => {},
        }

        const wrapper = mount(
            <Form onSubmit={() => {}}>{() => <JobForm {...props} />}</Form>
        )

        const submitButton = wrapper.find({
            'data-test': 'dhis2-uicore-button',
            type: 'submit',
        })

        const circularLoader = submitButton.find({
            'data-test': 'dhis2-uicore-circularloader',
        })
        const progressBar = submitButton.find({ role: 'progressbar' })

        expect(circularLoader.length > 0).toBe(true)
        expect(progressBar.length > 0).toBe(true)
    })

    it('shows the schedule field when a jobtype is selected', () => {
        const wrapper = mount(
            <Form
                onSubmit={() => {}}
                setIsPristine={() => {}}
                component={JobForm}
                initialValues={{
                    [fieldNames.JOB_TYPE]: 'jobType',
                }}
            />
        )

        const actual = wrapper.find({ 'data-test': 'job-type-field' })

        expect(actual.length > 0).toBe(true)
    })

    it('shows the parameter fields when a jobtype is selected', () => {
        const wrapper = mount(
            <Form
                onSubmit={() => {}}
                setIsPristine={() => {}}
                component={JobForm}
                initialValues={{
                    [fieldNames.JOB_TYPE]: 'jobType',
                }}
            />
        )

        const actual = wrapper.find({ 'data-test': 'parameter-fields' })

        expect(actual.length > 0).toBe(true)
    })

    it('disables the submit button when pristine', () => {
        const props = {
            handleSubmit: () => {},
            pristine: true,
            submitting: false,
            submitError: [],
            hasSubmitErrors: false,
            values: {},
            setIsPristine: () => {},
        }

        const wrapper = mount(
            <Form onSubmit={() => {}}>{() => <JobForm {...props} />}</Form>
        )

        const actual = wrapper.find({
            'data-test': 'dhis2-uicore-button',
            type: 'submit',
            disabled: true,
        })

        expect(actual.length > 0).toBe(true)
    })

    it('disables the submit button when submitting', () => {
        const props = {
            handleSubmit: () => {},
            pristine: false,
            submitting: true,
            submitError: [],
            hasSubmitErrors: false,
            values: {},
            setIsPristine: () => {},
        }

        const wrapper = mount(
            <Form onSubmit={() => {}}>{() => <JobForm {...props} />}</Form>
        )

        const actual = wrapper.find({
            'data-test': 'dhis2-uicore-button',
            type: 'submit',
            disabled: true,
        })

        expect(actual.length > 0).toBe(true)
    })
})
