import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { CustomDataProvider } from '@dhis2/app-runtime'
import useScheduleById from './use-schedule-by-id'

describe('useScheduleById', () => {
    it('should return a sequence by id', async () => {
        const id = 'id'
        const schedule = { sequence: [{ id }] }
        const data = { scheduler: [schedule] }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useScheduleById(id), {
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
                data: schedule,
            })
        })
    })

    it('should return an error if the schedule could not be found', async () => {
        const data = { scheduler: [] }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useScheduleById('id'), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current.error.message).toBe(
                'Could not find schedule with id id'
            )
            expect(result.current).toMatchObject({
                loading: false,
                data: undefined,
            })
        })
    })
})
