import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { useJobAndQueueFilter, useShowSystemJobs } from './hooks'
import StoreContext from './StoreContext'

describe('useJobAndQueueFilter', () => {
    it('should return the jobAndQueueFilter part of the store', () => {
        const jobAndQueueFilter = 'jobAndQueueFilter'
        const store = {
            jobAndQueueFilter,
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useJobAndQueueFilter(), { wrapper })

        expect(result.current).toBe(jobAndQueueFilter)
    })
})

describe('useShowSystemJobs', () => {
    it('should return the showSystemJobs part of the store', () => {
        const showSystemJobs = 'showSystemJobs'
        const store = {
            showSystemJobs,
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useShowSystemJobs(), { wrapper })

        expect(result.current).toBe(showSystemJobs)
    })
})
