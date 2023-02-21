import React from 'react'
import { shallow, mount } from 'enzyme'
import { useDataQuery } from '@dhis2/app-runtime'
import expectRenderError from '../../../test/expect-render-error'
import Store from './Store'

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<Store>', () => {
    describe('loading', () => {
        it('shows a spinner when all are loading', () => {
            useDataQuery.mockImplementation(() => ({ loading: true }))

            const wrapper = mount(<Store>Child</Store>)
            const loadingIndicator = wrapper.find({
                'data-test': 'dhis2-uicore-circularloader',
            })

            expect(loadingIndicator).toHaveLength(1)
        })
    })

    describe('errors', () => {
        it('throws an error if all have errors', () => {
            const message = 'Something went wrong'
            const error = new Error(message)

            useDataQuery.mockImplementation(() => ({ loading: false, error }))

            expectRenderError(<Store>Child</Store>, message)
        })
    })

    it('renders the children when all data has been fetched', () => {
        useDataQuery.mockImplementationOnce(() => ({
            loading: false,
            error: undefined,

            data: { jobs: [{ sequence: [] }, { sequence: [] }] },
        }))
        useDataQuery.mockImplementationOnce(() => ({
            loading: false,
            error: undefined,
            data: { jobTypes: { jobTypes: 'jobTypes' } },
        }))
        useDataQuery.mockImplementationOnce(() => ({
            loading: false,
            error: undefined,
            data: {
                skipTableTypes: 'skipTableTypes',
                validationRuleGroups: {},
                pushAnalysis: {},
                predictors: {},
                predictorGroups: {},
            },
        }))

        const wrapper = shallow(<Store>Child</Store>)

        expect(wrapper.text()).toEqual(expect.stringContaining('Child'))
    })
})
