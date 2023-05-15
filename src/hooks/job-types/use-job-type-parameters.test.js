import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { CustomDataProvider } from '@dhis2/app-runtime'
import useJobTypeParameters from './use-job-type-parameters'

describe('useJobTypeParameters', () => {
    it('should return the requested job parameters', async () => {
        const jobParameters = 'jobParameters'
        const jobType = 'match'
        const data = {
            'jobConfigurations/jobTypes': {
                jobTypes: [{ jobType, jobParameters }],
            },
        }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(
            () => useJobTypeParameters(jobType),
            {
                wrapper,
            }
        )

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: jobParameters,
            })
        })
    })

    it('should return an empty array if the jobType has no jobParameters', async () => {
        const jobType = 'match'
        const data = {
            'jobConfigurations/jobTypes': {
                jobTypes: [{ jobType }],
            },
        }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(
            () => useJobTypeParameters(jobType),
            {
                wrapper,
            }
        )

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: [],
            })
        })
    })
})
