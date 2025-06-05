import React from 'react'
import { renderHook } from '@testing-library/react'
import { useStore } from './hooks'
import StoreContext from './StoreContext'

describe('useNameFilter', () => {
    it('should return the nameFilter, showSystemJobs parts of the store', () => {
        const nameFilter = 'nameFilter'
        const setNameFilter = () => {}
        const showSystemJobs = false
        const setShowSystemJobs = () => {}
        const store = {
            nameFilter,
            setNameFilter,
            showSystemJobs,
            setShowSystemJobs,
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useStore(), { wrapper })

        expect(result.current).toEqual(store)
    })
})
