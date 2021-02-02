import {
    getJobsStore,
    getJobTypesStore,
    getParameterOptionsStore,
    getRefetchJobs,
    getJobById,
    getJobType,
    getJobTypeParameters,
    getParameterOptions,
} from './selectors'

describe('root store selectors', () => {
    describe('getJobsStore', () => {
        it('returns the jobs part of the store', () => {
            const store = {
                jobs: 'jobs',
            }
            const actual = getJobsStore(store)

            expect(actual).toEqual('jobs')
        })
    })

    describe('getJobTypesStore', () => {
        it('returns the job types part of the store', () => {
            const store = {
                jobTypes: 'jobTypes',
            }
            const actual = getJobTypesStore(store)

            expect(actual).toEqual('jobTypes')
        })
    })

    describe('getParameterOptionsStore', () => {
        it('returns the parameter options part of the store', () => {
            const store = {
                parameterOptions: 'parameterOptions',
            }
            const actual = getParameterOptionsStore(store)

            expect(actual).toEqual('parameterOptions')
        })
    })

    describe('getRefetchJobs', () => {
        it('returns refetchJobs', () => {
            const store = {
                refetchJobs: 'refetchJobs',
            }
            const actual = getRefetchJobs(store)

            expect(actual).toEqual('refetchJobs')
        })
    })
})

describe('jobs', () => {
    describe('getJobById', () => {
        it('returns the first job that matches the provided id', () => {
            const store = {
                jobs: [
                    {
                        id: 'one',
                        name: 'one',
                    },
                    {
                        id: 'two',
                        name: 'two',
                    },
                ],
            }
            const expected = {
                id: 'one',
                name: 'one',
            }

            const actual = getJobById(store, 'one')

            expect(actual).toEqual(expected)
        })
    })
})

describe('jobTypes', () => {
    describe('getJobType', () => {
        it('returns the requested job type', () => {
            const store = {
                jobTypes: [
                    { jobType: 'one' },
                    { jobType: 'two' },
                    { jobType: 'three' },
                ],
            }
            const jobType = 'one'
            const expected = { jobType: 'one' }
            const actual = getJobType(store, jobType)

            expect(actual).toEqual(expected)
        })
    })

    describe('getJobTypeParameters', () => {
        it('returns an array with all parameters for the requested job type', () => {
            const store = {
                jobTypes: [
                    { jobType: 'one', jobParameters: ['parameter one'] },
                    { jobType: 'two', jobParameters: ['parameter two'] },
                    { jobType: 'three', jobParameters: ['parameter three'] },
                ],
            }
            const jobType = 'one'
            const expected = ['parameter one']
            const actual = getJobTypeParameters(store, jobType)

            expect(actual).toEqual(expected)
        })

        it('returns an empty array for a job type that has no job parameters', () => {
            const store = {
                jobTypes: [
                    { jobType: 'one' },
                    { jobType: 'two' },
                    { jobType: 'three' },
                ],
            }
            const jobType = 'one'
            const expected = []
            const actual = getJobTypeParameters(store, jobType)

            expect(actual).toEqual(expected)
        })
    })
})

describe('parameterOptions', () => {
    describe('getParameterOptions', () => {
        it('returns the parameterOptions for a given parameter', () => {
            const store = {
                parameterOptions: {
                    one: 'one',
                    two: 'two',
                },
            }
            const actual = getParameterOptions(store, 'one')

            expect(actual).toEqual('one')
        })
    })
})
