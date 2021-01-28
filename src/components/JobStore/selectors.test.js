import {
    getEntities,
    getIds,
    getUserJobs,
    getJobsMatchingFilter,
} from './selectors'

describe('getEntities', () => {
    it('reduces an array of jobs to an object with jobs indexed by id', () => {
        const jobs = [
            {
                id: 'one',
                content: 'one',
            },
            {
                id: 'two',
                content: 'two',
            },
        ]
        const expected = {
            one: {
                id: 'one',
                content: 'one',
            },
            two: {
                id: 'two',
                content: 'two',
            },
        }
        const actual = getEntities(jobs)

        expect(actual).toEqual(expected)
    })
})

describe('getIds', () => {
    it('returns the ids of an array of jobs', () => {
        const jobs = [
            {
                id: 'one',
                content: 'one',
            },
            {
                id: 'two',
                content: 'two',
            },
        ]
        const expected = ['one', 'two']
        const actual = getIds(jobs)

        expect(actual).toEqual(expected)
    })
})

describe('getUserJobs', () => {
    it('returns the ids of jobs with a truthy configurable property', () => {
        const jobs = [
            {
                id: 'one',
                content: 'one',
                configurable: true,
            },
            {
                id: 'two',
                content: 'two',
            },
        ]
        const expected = [
            {
                id: 'one',
                content: 'one',
                configurable: true,
            },
        ]
        const actual = getUserJobs(jobs)

        expect(actual).toEqual(expected)
    })
})

describe('getJobsMatchingFilter', () => {
    it('returns the jobs that match the filter', () => {
        const jobs = [
            {
                id: 'one',
                name: 'one',
            },
            {
                id: 'two',
                name: 'two',
            },
            {
                id: 'three',
                name: 'One',
            },
            {
                id: 'four',
                name: 'Oneeee',
            },
        ]
        const expected = [
            {
                id: 'one',
                name: 'one',
            },
            {
                id: 'three',
                name: 'One',
            },
            {
                id: 'four',
                name: 'Oneeee',
            },
        ]
        const actual = getJobsMatchingFilter(jobs, 'one')

        expect(actual).toEqual(expected)
    })
})
