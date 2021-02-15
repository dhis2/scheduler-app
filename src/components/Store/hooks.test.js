import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { useJobFilter, useShowSystemJobs, useJobs, useListJobs } from './hooks'
import StoreContext from './StoreContext'

describe('useJobs', () => {
    it('should return the jobs part of the store', () => {
        const jobs = 'jobs'
        const store = {
            jobs,
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useJobs(), { wrapper })

        expect(result.current).toBe(jobs)
    })
})

describe('useJobFilter', () => {
    it('should return the jobFilter part of the store', () => {
        const jobFilter = 'jobFilter'
        const store = {
            jobFilter,
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useJobFilter(), { wrapper })

        expect(result.current).toBe(jobFilter)
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

describe('useListJobs', () => {
    const user1 = {
        name: 'User One',
        configurable: true,
    }
    const user2 = {
        name: 'User Two',
        configurable: true,
    }
    const system1 = {
        name: 'System One',
        configurable: false,
    }
    const system2 = {
        name: 'System Two',
        configurable: false,
    }

    it('should return matching jobs when there is no filter and showSystemJobs is false', () => {
        const store = {
            jobFilter: [''],
            showSystemJobs: [false],
            jobs: [user1, user2, system1, system2],
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useListJobs(), { wrapper })

        expect(result.current).toEqual(expect.arrayContaining([user1, user2]))
    })

    it('should return matching jobs when there is no filter and showSystemJobs is true', () => {
        const store = {
            jobFilter: [''],
            showSystemJobs: [true],
            jobs: [user1, user2, system1, system2],
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useListJobs(), { wrapper })

        expect(result.current).toEqual(
            expect.arrayContaining([user1, user2, system1, system2])
        )
    })

    it('should return matching jobs when there is a filter and showSystemJobs is false', () => {
        const store = {
            jobFilter: ['One'],
            showSystemJobs: [false],
            jobs: [user1, user2, system1, system2],
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useListJobs(), { wrapper })

        expect(result.current).toEqual(expect.arrayContaining([user1]))
    })

    it('should return matching jobs when there is a filter and showSystemJobs is true', () => {
        const store = {
            jobFilter: ['One'],
            showSystemJobs: [true],
            jobs: [user1, user2, system1, system2],
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useListJobs(), { wrapper })

        expect(result.current).toEqual(expect.arrayContaining([user1, system1]))
    })
})
