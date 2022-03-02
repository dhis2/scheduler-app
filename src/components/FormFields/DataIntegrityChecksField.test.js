import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import { StoreContext } from '../Store'
import DataIntegrityChecksField from './DataIntegrityChecksField'

const { Form } = ReactFinalForm

describe('<DataIntegrityChecksField>', () => {
    const store = {
        jobTypes: [
            {
                jobType: 'DATA_INTEGRITY',
                jobParameters: [
                    {
                        fieldName: 'fieldName',
                        name: 'checks',
                        klass: 'klass',
                    },
                ],
            },
        ],
        parameterOptions: {
            dataIntegrityChecks: [
                {
                    name: 'data_elements_without_groups',
                    section: 'Legacy',
                    severity: 'WARNING',
                },
            ],
        },
    }

    const WithStore = ({ children }) => (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )

    const DataIntegrityField = () => (
        <WithStore>
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <DataIntegrityChecksField
                            name="jobParamters.checks"
                            label="Checks"
                            parameterName="checks"
                        />
                    </form>
                )}
            </Form>
        </WithStore>
    )

    it('defaults to Run all available checks', () => {
        const wrapper = mount(<DataIntegrityField />)

        const actual = wrapper
            .find({ 'data-test': 'dhis2-uicore-radio' })
            .find({ checked: true })

        // value is false when "Run all" is selected
        expect(actual.prop('value')).toEqual('false')
    })

    it.only('shows transfer component when "Only run selected checks" is checked', () => {
        const wrapper = mount(<DataIntegrityField />)

        wrapper
            .find({ 'data-test': 'dhis2-uicore-radio' })
            .find({ value: 'true' })
            .simulate('change', { target: { value: 'true' } })

        const actual = wrapper
            .find({ 'data-test': 'dhis2-uicore-radio' })
            .find({ checked: true })

        expect(actual).toHaveLength(1)
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
