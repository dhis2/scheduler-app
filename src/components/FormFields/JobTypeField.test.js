import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import expectRenderError from '../../../test/expect-render-error'
import JobTypeField from './JobTypeField'

const { Form } = ReactFinalForm

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<JobTypeField>', () => {
    it('shows a loading message when loading', () => {
        useDataQuery.mockImplementation(() => ({
            loading: true,
            error: undefined,
            data: null,
        }))
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <JobTypeField />
                    </form>
                )}
            </Form>
        )

        // Open the menu
        wrapper
            .find({ 'data-test': 'dhis2-uicore-select-input' })
            .simulate('click')

        const loadingIndicator = wrapper.find({
            'data-test': 'dhis2-uicore-singleselect-loading',
        })

        expect(loadingIndicator.length).toBe(1)
        expect(loadingIndicator.text().includes('Loading')).toBe(true)

        /**
         * Umounting manually here prevents React throwing an act warning. I suspect the warning
         * is caused by the popper setting state at a point where it's not wrapped in act.
         * See here: https://github.com/popperjs/react-popper/issues/368
         * Neither wrapping mount, nor the click simulation resolves the warning, but unmounting
         * manually seems to silence it. It should be ok to do that since the popper changes
         * should only affect placement, which we're not testing here.
         */
        wrapper.unmount()
    })

    it('throws errors it encounters during fetching', () => {
        const message = 'Something went wrong'

        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: new Error(message),
            data: null,
        }))

        expectRenderError(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <JobTypeField />
                    </form>
                )}
            </Form>,
            message
        )
    })

    it('shows an error that the field is required on empty values', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {
                jobTypes: {
                    jobTypes: [{ jobType: 'ANALYTICS_TABLE' }],
                },
            },
        }))

        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <JobTypeField />
                    </form>
                )}
            </Form>
        )

        // Trigger validation
        wrapper.find('form').simulate('submit')

        const actual = wrapper
            .find({
                'data-test': 'dhis2-uiwidgets-singleselectfield-validation',
            })
            .text()

        expect(actual.includes('Please provide a value')).toBe(true)
    })
})
