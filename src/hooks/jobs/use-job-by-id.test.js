import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { CustomDataProvider } from '@dhis2/app-runtime'
import useJobById from './use-job-by-id'

describe('useJobById', () => {
    it('should return a job by id', async () => {
        const id = 'id'
        const job = { id }
        const data = {
            'jobConfigurations/id': job,
        }

        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobById(id), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: job,
            })
        })
    })
})
