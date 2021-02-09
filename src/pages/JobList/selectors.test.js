import { getUserJobs, getJobsMatchingFilter } from './selectors'

describe('getUserJobs', () => {
    it('returns the jobs with a truthy configurable property', () => {
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
