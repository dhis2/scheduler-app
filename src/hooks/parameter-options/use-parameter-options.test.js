import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { CustomDataProvider } from '@dhis2/app-runtime'
import useParameterOptions from './use-parameter-options'

describe('useParameterOptions', () => {
    it('should return the expected data without nesting', async () => {
        const data = {
            'analytics/tableTypes': 'skipTableTypes',
            validationRuleGroups: {
                validationRuleGroups: 'validationRuleGroups',
            },
            pushAnalysis: { pushAnalysis: 'pushAnalysis' },
            predictors: { predictors: 'predictors' },
            predictorGroups: { predictorGroups: 'predictorGroups' },
            dataIntegrity: 'dataIntegrityChecks',
        }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useParameterOptions(), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: {
                    skipTableTypes: 'skipTableTypes',
                    validationRuleGroups: 'validationRuleGroups',
                    pushAnalysis: 'pushAnalysis',
                    predictors: 'predictors',
                    predictorGroups: 'predictorGroups',
                    dataIntegrityChecks: 'dataIntegrityChecks',
                },
            })
        })
    })

    it('should return an error if the parameter options are in an unexpected format', async () => {
        const data = {
            'analytics/tableTypes': 'skipTableTypes',
            validationRuleGroups: {},
            pushAnalysis: { pushAnalysis: 'pushAnalysis' },
            predictors: { predictors: 'predictors' },
            predictorGroups: { predictorGroups: 'predictorGroups' },
            dataIntegrity: 'dataIntegrityChecks',
        }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useParameterOptions(), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                data: undefined,
            })
            expect(result.current.error.message).toBe(
                'Did not receive the expected parameter options'
            )
        })
    })
})
