import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import expectRenderError from '../../../test/expect-render-error'
import ScheduleField from './ScheduleField'

const { Form } = ReactFinalForm

// Mock these components to simplify this test
jest.mock('./CronField', () => () => <div>CronField</div>)
jest.mock('./DelayField', () => () => <div>DelayField</div>)

// Moch getJobTypeObject, since we're going to test it separately
jest.mock('./selectors', () => ({
    getJobTypeObject: data => data,
}))

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<ScheduleField>', () => {
    it('returns null when loading', () => {
        useDataQuery.mockImplementation(() => ({
            loading: true,
            error: undefined,
            data: null,
        }))
        const props = {
            jobType: 'jobType',
        }
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <ScheduleField {...props} />
                    </form>
                )}
            </Form>
        )

        const children = wrapper.find('form').children()

        expect(children.isEmptyRender()).toBe(true)
    })

    it('throws errors it encounters during fetching', () => {
        const message = 'Something went wrong'
        const props = {
            jobType: 'jobType',
        }

        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: new Error(message),
            data: null,
        }))

        expectRenderError(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <ScheduleField {...props} />
                    </form>
                )}
            </Form>,
            message
        )
    })

    it('renders the cron field if the scheduling type is CRON', () => {
        const props = {
            jobType: 'jobType',
        }
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: { jobTypes: { jobTypes: { schedulingType: 'CRON' } } },
        }))
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <ScheduleField {...props} />
                    </form>
                )}
            </Form>
        )

        const actual = wrapper.text()

        expect(actual).toEqual(expect.stringContaining('CronField'))
        expect(actual).toEqual(expect.not.stringContaining('DelayField'))
    })

    it('renders the delay field if the scheduling type is FIXED_DELAY', () => {
        const props = {
            jobType: 'jobType',
        }
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: { jobTypes: { jobTypes: { schedulingType: 'FIXED_DELAY' } } },
        }))
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <ScheduleField {...props} />
                    </form>
                )}
            </Form>
        )

        const actual = wrapper.text()

        expect(actual).toEqual(expect.stringContaining('DelayField'))
        expect(actual).toEqual(expect.not.stringContaining('CronField'))
    })

    it('returns null for unrecognised scheduling types', () => {
        const props = {
            jobType: 'jobType',
        }
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {
                jobTypes: { jobTypes: { schedulingType: 'DOES_NOT_EXIST' } },
            },
        }))
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <ScheduleField {...props} />
                    </form>
                )}
            </Form>
        )

        const children = wrapper.find('form').children()

        expect(children.isEmptyRender()).toBe(true)
    })
})
