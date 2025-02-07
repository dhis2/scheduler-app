import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { CustomDataProvider } from '@dhis2/app-runtime'
import useJobs from './use-jobs'

describe('useJobs', () => {
    it('should return the expected data', async () => {
        const match = [{ id: 'id' }]
        const data = {
            jobConfigurations: {
                jobConfigurations: match,
            },
        }

        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobs(), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: match,
            })
        })
    })

    it('should return an error if the jobs are in an unexpected format', async () => {
        const data = {
            jobConfigurations: {
                jobConfigurations: '',
            },
        }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobs(), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                data: undefined,
            })
            expect(result.current.error.message).toBe(
                'Did not receive the expected job configurations'
            )
        })
    })
})
