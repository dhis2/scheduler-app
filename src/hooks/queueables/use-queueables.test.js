import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { CustomDataProvider } from '@dhis2/app-runtime'
import useQueueables from './use-queueables'

describe('useQueueables', () => {
    it('should return the requested data', async () => {
        const queueable = {
            sequence: [{ id: 'id' }],
        }
        const expected = [{ ...queueable, id: queueable.sequence[0].id }]
        const data = {
            'scheduler/queueable': [queueable],
        }
        const wrapper = ({ children }) => (
            <CustomDataProvider data={data}>{children}</CustomDataProvider>
        )

        const { result, waitFor } = renderHook(() => useQueueables(), {
            wrapper,
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                error: undefined,
                data: expected,
            })
        })
    })
})
