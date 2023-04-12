import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { CustomDataProvider } from '@dhis2/app-runtime'
import useJobType from './use-job-type'

describe('useJobType', () => {
    it('should return the requested job type', () => {
        const jobType = 'match'
        const job = { jobType }
        const data = [{ jobType: 'nomatch' }, job]
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobType(jobType), {
            wrapper,
        })

        waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: job,
            })
        })
    })
})