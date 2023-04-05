import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { CustomDataProvider } from '@dhis2/app-runtime'
import useJobSchedules from './use-job-schedules'

describe('useJobSchedules', () => {
    it('should return the expected data', () => {
        const job = { sequence: [{ id: 'id' }] }
        const data = { scheduler: [job] }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useJobSchedules(), {
            wrapper,
        })

        waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: [{ id: 'id', sequence: [{ id: 'id' }] }],
            })
        })
    })
})
