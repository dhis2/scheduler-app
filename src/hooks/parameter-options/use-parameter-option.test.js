import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { CustomDataProvider } from '@dhis2/app-runtime'
import useParameterOption from './use-parameter-option'

describe('useParameterOption', () => {
    it('should return the requested parameter option', async () => {
        const parameter = 'validationRuleGroups'
        const expected = 'expected'
        const data = {
            'analytics/tableTypes': 'skipTableTypes',
            validationRuleGroups: {
                validationRuleGroups: expected,
            },
            pushAnalysis: { pushAnalysis: 'pushAnalysis' },
            predictors: { predictors: 'predictors' },
            predictorGroups: { predictorGroups: 'predictorGroups' },
            dataIntegrity: 'dataIntegrityChecks',
        }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(
            () => useParameterOption(parameter),
            {
                wrapper,
            }
        )

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: expected,
            })
        })
    })
})
