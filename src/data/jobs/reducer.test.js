import reducer, * as selectors from './reducer'
import * as types from './actionTypes'

describe('reducer', () => {
    const initialState = {
        lastUpdated: 0,
        errorMessage: '',
        isFetching: false,
        entities: {},
        ids: [],
    }
    const fetchingState = {
        ...initialState,
        isFetching: true,
    }

    it('should return the initial state', () => {
        const actual = reducer(undefined, {})
        const expected = initialState

        expect(actual).toEqual(expected)
    })

    it('should handle FETCH_JOBS', () => {
        const actual = reducer(undefined, { type: types.FETCH_JOBS })
        const expected = fetchingState

        expect(actual).toEqual(expected)
    })

    it('should handle FETCH_JOBS_SUCCESS', () => {
        const payload = {
            entities: {
                jobs: 'job',
            },
            result: ['job'],
        }
        const actual = reducer(fetchingState, {
            type: types.FETCH_JOBS_SUCCESS,
            meta: { receivedAt: 1 },
            payload,
        })
        const expected = {
            ...fetchingState,
            lastUpdated: 1,
            errorMessage: '',
            isFetching: false,
            entities: 'job',
            ids: ['job'],
        }

        expect(actual).toEqual(expected)
    })

    it('should handle FETCH_JOBS_FAIL with an errormessage', () => {
        const actual = reducer(fetchingState, {
            type: types.FETCH_JOBS_FAIL,
            meta: { receivedAt: 1 },
            error: new Error('error'),
        })
        const expected = {
            ...fetchingState,
            lastUpdated: 1,
            errorMessage: 'error',
            isFetching: false,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle FETCH_JOBS_FAIL without an errormessage', () => {
        const actual = reducer(fetchingState, {
            type: types.FETCH_JOBS_FAIL,
            meta: { receivedAt: 1 },
            error: new Error(),
        })
        const expected = {
            ...fetchingState,
            lastUpdated: 1,
            errorMessage:
                'Something went wrong, but no errormessage was provided.',
            isFetching: false,
        }

        expect(actual).toEqual(expected)
    })
})

describe('getIsFetching', () => {
    it('should return fetching state', () => {
        const state = { isFetching: true }
        const expected = state.isFetching
        const actual = selectors.getIsFetching(state)

        expect(actual).toEqual(expected)
    })
})

describe('getErrorMessage', () => {
    it('should return error message', () => {
        const state = { errorMessage: 'Message' }
        const expected = state.errorMessage
        const actual = selectors.getErrorMessage(state)

        expect(actual).toEqual(expected)
    })
})

describe('getShouldFetch', () => {
    const initialState = {
        lastUpdated: 0,
        errorMessage: '',
        isFetching: false,
        entities: {},
        ids: [],
    }

    it('should return false if currently fetching', () => {
        const state = { ...initialState, isFetching: true }
        const expected = false
        const actual = selectors.getShouldFetch(state)

        expect(actual).toEqual(expected)
    })

    it('should return true if it has an error message', () => {
        const state = { ...initialState, errorMessage: 'error' }
        const expected = true
        const actual = selectors.getShouldFetch(state)

        expect(actual).toEqual(expected)
    })

    it('should return true if it has not fetched yet', () => {
        const state = { ...initialState }
        const expected = true
        const actual = selectors.getShouldFetch(state)

        expect(actual).toEqual(expected)
    })
})
