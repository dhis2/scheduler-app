import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { CustomDataProvider } from '@dhis2/app-runtime'
import useJobSchedules from './use-job-schedules'

describe('useJobSchedules', () => {
    it('should return the expected data', async () => {
        const job = { sequence: [{ id: 'id' }] }
        const data = { scheduler: [job] }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobSchedules(), {
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
        const job = {}
        const data = { scheduler: [job] }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobSchedules(), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: [job],
            })
        })
    })

    it('should not fail if sequence is empty', async () => {
        const job = { sequence: [] }
        const data = { scheduler: [job] }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobSchedules(), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: [job],
            })
        })
    })

    it('should not fail if the first sequence has no id', async () => {
        const job = { sequence: [{}] }
        const data = { scheduler: [job] }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobSchedules(), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: [job],
            })
        })
    })

    it('should return an error if schedules are in an unexpected format', async () => {
        const data = { scheduler: '' }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobSchedules(), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                data: undefined,
            })
            expect(result.current.error.message).toBe(
                'Did not receive the expected schedules'
            )
        })
    })
})
