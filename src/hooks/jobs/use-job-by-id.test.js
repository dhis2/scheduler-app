import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { CustomDataProvider } from '@dhis2/app-runtime'
import useJobById from './use-job-by-id'

describe('useJobById', () => {
    it('should return a job by id', () => {
        const id = 'match'
        const match = { id }
        const nomatch = { id: 'nomatch' }
        const data = {
            jobConfigurations: {
                jobConfigurations: [nomatch, match],
            },
        }

        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobById(id), {
            wrapper,
        })

        waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: match,
            })
        })
    })
})
