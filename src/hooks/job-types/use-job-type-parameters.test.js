import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { CustomDataProvider } from '@dhis2/app-runtime'
import useJobTypeParameters from './use-job-type-parameters'

describe('useJobTypeParameters', () => {
    it('should return the requested job parameters', () => {
        const jobType = 'jobType'
        const jobParameters = 'jobParameters'
        const job = { jobType, jobParameters }
        const data = [{ jobType: 'nomatch' }, job]
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(
            () => useJobTypeParameters(jobType),
            {
                wrapper,
            }
        )

        waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: jobParameters,
            })
        })
    })
})
