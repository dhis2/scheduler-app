import React from 'react'
import { renderHook } from '@testing-library/react'
import { useNameFilter, useShowSystemJobs } from './hooks'
import StoreContext from './StoreContext'

describe('useNameFilter', () => {
    it('should return the nameFilter part of the store', () => {
        const nameFilter = 'nameFilter'
        const store = {
            nameFilter,
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useNameFilter(), { wrapper })

        expect(result.current).toBe(nameFilter)
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
