import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { CustomDataProvider } from '@dhis2/app-runtime'
import useJobTypes from './use-job-types'

describe('useJobTypes', () => {
    it('should return the job types without nesting', () => {
        const jobTypes = ['jobTypes']
        const data = { jobTypes }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobTypes(), {
            wrapper,
        })

        waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: jobTypes,
            })
        })
    })
})
