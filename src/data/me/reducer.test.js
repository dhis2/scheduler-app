import reducer, * as selectors from './reducer'
import * as types from './actionTypes'

describe('reducer', () => {
    const initialState = {
        didFetchSuccessfully: false,
        errorMessage: '',
        isFetching: false,
        data: {},
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

    it('should handle FETCH_ME', () => {
        const actual = reducer(undefined, { type: types.FETCH_ME })
        const expected = fetchingState

        expect(actual).toEqual(expected)
    })

    it('should handle FETCH_ME_SUCCESS', () => {
        const payload = 'payload'
        const actual = reducer(fetchingState, {
            type: types.FETCH_ME_SUCCESS,
            payload,
        })
        const expected = {
            didFetchSuccessfully: true,
            errorMessage: '',
            isFetching: false,
            data: payload,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle FETCH_ME_FAIL with an errormessage', () => {
        const actual = reducer(fetchingState, {
            type: types.FETCH_ME_FAIL,
            error: new Error('error'),
        })
        const expected = {
            didFetchSuccessfully: false,
            errorMessage: 'error',
            isFetching: false,
            data: {},
        }

        expect(actual).toEqual(expected)
    })

    it('should handle FETCH_ME_FAIL without an errormessage', () => {
        const actual = reducer(fetchingState, {
            type: types.FETCH_ME_FAIL,
            error: new Error(),
        })
        const expected = {
            didFetchSuccessfully: false,
            errorMessage:
                'Something went wrong, but no errormessage was provided.',
            isFetching: false,
            data: {},
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

describe('getIsAuthorized', () => {
    it('should return false if there are no authorities', () => {
        const state = { data: {} }
        const expected = false
        const actual = selectors.getIsAuthorized(state)

        expect(actual).toEqual(expected)
    })

    it('should return false if the user is not authorized', () => {
        const state = {
            data: {
                authorities: [],
            },
        }
        const expected = false
        const actual = selectors.getIsAuthorized(state)

        expect(actual).toEqual(expected)
    })

    it('should return true if the user has permission ALL', () => {
        const state = {
            data: {
                authorities: ['ALL'],
            },
        }
        const expected = true
        const actual = selectors.getIsAuthorized(state)

        expect(actual).toEqual(expected)
    })

    it('should return true if the user has permission F_SCHEDULING_ADMIN', () => {
        const state = {
            data: {
                authorities: ['F_SCHEDULING_ADMIN'],
            },
        }
        const expected = true
        const actual = selectors.getIsAuthorized(state)

        expect(actual).toEqual(expected)
    })
})

describe('getShouldFetch', () => {
    const initialState = {
        didFetchSuccessfully: false,
        errorMessage: '',
        isFetching: false,
        data: {},
    }

    it('should return false if currently fetching', () => {
        const state = { ...initialState, isFetching: true }
        const expected = false
        const actual = selectors.getShouldFetch(state)

        expect(actual).toEqual(expected)
    })

    it('should return false if it has authorities', () => {
        const state = { ...initialState, data: { authorities: [] } }
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

    it('should return true if it has no authorities', () => {
        const state = { ...initialState }
        const expected = true
        const actual = selectors.getShouldFetch(state)

        expect(actual).toEqual(expected)
    })

    it('should return true if it has no authorities but did fetch successfully', () => {
        const state = {
            didFetchSuccessfully: true,
            errorMessage: '',
            isFetching: false,
            data: {},
        }
        const expected = true
        const actual = selectors.getShouldFetch(state)

        expect(actual).toEqual(expected)
    })
})
