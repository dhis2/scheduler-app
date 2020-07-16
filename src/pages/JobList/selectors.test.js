import { getEntities, getIds, getUserJobIds } from './selectors'

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

describe('getUserJobIds', () => {
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
        const expected = ['one']
        const actual = getUserJobIds(jobs)

        expect(actual).toEqual(expected)
    })
})
