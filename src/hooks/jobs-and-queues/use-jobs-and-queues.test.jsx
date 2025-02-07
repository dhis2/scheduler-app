import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { CustomDataProvider } from '@dhis2/app-runtime'
import useJobsAndQueues from './use-jobs-and-queues'

describe('useJobsAndQueues', () => {
    it('should return the expected data', async () => {
        const item = { sequence: [{ id: 'id' }] }
        const data = { scheduler: [item] }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobsAndQueues(), {
            wrapper,
        })

        // Loading state
        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: true,
                error: undefined,
                data: undefined,
            })
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: [{ id: 'id', sequence: [{ id: 'id' }] }],
            })
        })
    })

    it('should not fail if sequence is missing', async () => {
        const item = {}
        const data = { scheduler: [item] }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobsAndQueues(), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: [item],
            })
        })
    })

    it('should not fail if sequence is empty', async () => {
        const item = { sequence: [] }
        const data = { scheduler: [item] }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobsAndQueues(), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: [item],
            })
        })
    })

    it('should not fail if the first sequence item has no id', async () => {
        const item = { sequence: [{}] }
        const data = { scheduler: [item] }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobsAndQueues(), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: [item],
            })
        })
    })

    it('should return an error if data is in an unexpected format', async () => {
        const data = { scheduler: '' }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobsAndQueues(), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                data: undefined,
            })
            expect(result.current.error.message).toBe(
                'Did not receive the expected jobs and queues'
            )
        })
    })
})
