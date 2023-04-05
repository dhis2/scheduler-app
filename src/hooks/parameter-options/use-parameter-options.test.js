import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { CustomDataProvider } from '@dhis2/app-runtime'
import useParameterOptions from './use-parameter-options'

describe('useParameterOptions', () => {
    it('should return the expected data without nesting', () => {
        const data = {
            skipTableTypes: 'skipTableTypes',
            validationRuleGroups: {
                validationRuleGroups: 'validationRuleGroups',
            },
            pushAnalysis: { pushAnalysis: 'pushAnalysis' },
            predictors: { predictors: 'predictors' },
            predictorGroups: { predictorGroups: 'predictorGroups' },
            dataIntegrityChecks: 'dataIntegrityChecks',
        }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useParameterOptions(), {
            wrapper,
        })

        waitFor(() => {
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
})
