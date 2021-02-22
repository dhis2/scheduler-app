import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import {
    useAllJobs,
    useAllParameterOptions,
    useAllJobTypes,
    useRefetchJobs,
    useJobFilter,
    useShowSystemJobs,
    useJobListJobs,
    useJob,
    useJobType,
    useJobTypeParameters,
    useParameterOptions,
} from './hooks'
import StoreContext from './StoreContext'

describe('useAllJobs', () => {
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
        const { result } = renderHook(() => useAllJobs(), { wrapper })

        expect(result.current).toBe(jobs)
    })
})

describe('useAllParameterOptions', () => {
    it('should return the parameterOptions part of the store', () => {
        const parameterOptions = 'parameterOptions'
        const store = {
            parameterOptions,
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useAllParameterOptions(), {
            wrapper,
        })

        expect(result.current).toBe(parameterOptions)
    })
})

describe('useAllJobTypes', () => {
    it('should return the jobTypes part of the store', () => {
        const jobTypes = 'jobTypes'
        const store = {
            jobTypes,
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useAllJobTypes(), { wrapper })

        expect(result.current).toBe(jobTypes)
    })
})

describe('useRefetchJobs', () => {
    it('should return the refetchJobs part of the store', () => {
        const refetchJobs = 'refetchJobs'
        const store = {
            refetchJobs,
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useRefetchJobs(), {
            wrapper,
        })

        expect(result.current).toBe(refetchJobs)
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

describe('useJobListJobs', () => {
    const user1 = {
        displayName: 'User One',
        configurable: true,
    }
    const user2 = {
        displayName: 'User Two',
        configurable: true,
    }
    const system1 = {
        displayName: 'System One',
        configurable: false,
    }
    const system2 = {
        displayName: 'System Two',
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
        const { result } = renderHook(() => useJobListJobs(), { wrapper })

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
        const { result } = renderHook(() => useJobListJobs(), { wrapper })

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
        const { result } = renderHook(() => useJobListJobs(), { wrapper })

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
        const { result } = renderHook(() => useJobListJobs(), { wrapper })

        expect(result.current).toEqual(expect.arrayContaining([user1, system1]))
    })
})

describe('useJob', () => {
    it('should return the requested job', () => {
        const expected = { id: 'one' }
        const store = {
            jobs: [expected, { id: 'two' }, { id: 'three' }],
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useJob('one'), { wrapper })

        expect(result.current).toEqual(expected)
    })
})

describe('useJobType', () => {
    it('should return the requested jobType', () => {
        const expected = { jobType: 'one' }
        const store = {
            jobTypes: [expected, { jobType: 'two' }, { jobType: 'three' }],
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useJobType('one'), { wrapper })

        expect(result.current).toEqual(expected)
    })
})

describe('useJobTypeParameters', () => {
    it('should return an array with parameters if there are any', () => {
        const expected = 'jobParameters'
        const store = {
            jobTypes: [{ jobType: 'jobType', jobParameters: expected }],
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useJobTypeParameters('jobType'), {
            wrapper,
        })

        expect(result.current).toEqual(expected)
    })

    it('should return an empty array if there are no parameters', () => {
        const store = {
            jobTypes: [{ jobType: 'jobType' }],
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useJobTypeParameters('jobType'), {
            wrapper,
        })

        expect(result.current).toEqual([])
    })
})

describe('useParameterOptions', () => {
    it('should return the requested parameterOptions', () => {
        const expected = 'parameterOption'
        const store = {
            parameterOptions: {
                one: expected,
                two: 'two',
                three: 'three',
            },
        }
        const wrapper = ({ children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
        const { result } = renderHook(() => useParameterOptions('one'), {
            wrapper,
        })

        expect(result.current).toEqual(expected)
    })
})
