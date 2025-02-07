import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { CustomDataProvider } from '@dhis2/app-runtime'
import useJobType from './use-job-type'

describe('useJobType', () => {
    it('should return the requested job type', async () => {
        const jobType = 'match'
        const job = { jobType }
        const data = {
            'jobConfigurations/jobTypes': {
                jobTypes: [{ jobType: 'nomatch' }, job],
            },
        }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobType(jobType), {
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

    it('should return an error if the job could not be found', async () => {
        const jobType = 'match'
        const data = {
            'jobConfigurations/jobTypes': {
                jobTypes: [{ jobType: 'nomatch' }],
            },
        }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobType(jobType), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                data: undefined,
            })
            expect(result.current.error.message).toBe(
                'Job type could not be found'
            )
        })
    })

    it('should return an error if the job types are in an unexpected format', async () => {
        const jobType = 'match'
        const data = {
            'jobConfigurations/jobTypes': {
                jobTypes: '',
            },
        }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobType(jobType), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                data: undefined,
            })
            expect(result.current.error.message).toBe(
                'Did not receive the expected job types'
            )
        })
    })
})
