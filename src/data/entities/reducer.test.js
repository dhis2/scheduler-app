import reducer, * as selectors from './reducer'

describe('reducer', () => {
    const initialState = {
        jobs: {},
    }

    it('should return the initial state', () => {
        const actual = reducer(undefined, {})
        const expected = initialState

        expect(actual).toEqual(expected)
    })

    it('should ignore actions with payload and without entities', () => {
        const actual = reducer(undefined, { payload: {} })
        const expected = initialState

        expect(actual).toEqual(expected)
    })

    it('should handle actions with entities', () => {
        const actual = reducer(undefined, {
            payload: {
                entities: {
                    jobs: {
                        1: { id: 1 },
                    },
                },
            },
        })
        const expected = {
            jobs: {
                1: { id: 1 },
            },
        }

        expect(actual).toEqual(expected)
    })
})

describe('getJobs', () => {
    it('should return job entities', () => {
        const state = {
            jobs: {
                1: { id: 1 },
            },
        }
        const expected = state.jobs
        const actual = selectors.getJobs(state)

        expect(actual).toEqual(expected)
    })
})
