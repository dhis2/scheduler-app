import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
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
            dashboards: { dashboards: 'dashboard' },
            userGroups: { userGroups: 'receivers' },
            programs: { programs: 'programs' },
        }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result } = renderHook(() => useParameterOption(parameter), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: expected,
            })
        })
    })
})
