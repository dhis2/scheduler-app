import reducer, * as selectors from './reducer'
import * as types from './actionTypes'

describe('reducer', () => {
    const initialState = {}
    const subState = {
        lastUpdated: 0,
        errorMessage: '',
        isFetching: false,
        data: [],
    }

    it('should return the initial state', () => {
        const actual = reducer(undefined, {})
        const expected = initialState

        expect(actual).toEqual(expected)
    })

    it('should handle FETCH_PARAMETER_LIST', () => {
        const meta = { jobType: 'jobType', parameterName: 'parameterName' }
        const actual = reducer(undefined, {
            type: types.FETCH_PARAMETER_LIST,
            meta,
        })
        const expected = {
            'jobType/parameterName': {
                ...subState,
                isFetching: true,
            },
        }

        expect(actual).toEqual(expected)
    })

    it('should handle FETCH_PARAMETER_LIST_SUCCESS', () => {
        const meta = { jobType: 'jobType', parameterName: 'parameterName' }
        const payload = 'data'
        const fetchingState = {
            'jobType/parameterName': {
                ...subState,
                isFetching: true,
            },
        }

        const actual = reducer(fetchingState, {
            type: types.FETCH_PARAMETER_LIST_SUCCESS,
            meta: {
                ...meta,
                receivedAt: 1,
            },
            payload,
        })
        const expected = {
            'jobType/parameterName': {
                lastUpdated: 1,
                errorMessage: '',
                isFetching: false,
                data: 'data',
            },
        }

        expect(actual).toEqual(expected)
    })

    it('should handle FETCH_PARAMETER_LIST_FAIL', () => {
        const meta = { jobType: 'jobType', parameterName: 'parameterName' }
        const fetchingState = {
            'jobType/parameterName': {
                ...subState,
                isFetching: true,
            },
        }

        const actual = reducer(fetchingState, {
            type: types.FETCH_PARAMETER_LIST_FAIL,
            meta: {
                ...meta,
                receivedAt: 1,
            },
            error: new Error('error'),
        })
        const expected = {
            'jobType/parameterName': {
                lastUpdated: 1,
                errorMessage: 'error',
                isFetching: false,
                data: [],
            },
        }

        expect(actual).toEqual(expected)
    })
})

describe('getParameterKey', () => {
    it('should return the parameterKey', () => {
        const expected = 'jobType/parameterName'
        const actual = selectors.getParameterKey('jobType', 'parameterName')

        expect(actual).toEqual(expected)
    })
})

describe('getHasParameter', () => {
    it('should return whether state has the parameter', () => {
        const state = { 'jobType/parameterName': {} }

        expect(
            selectors.getHasParameter(state, 'jobType/parameterName')
        ).toEqual(true)
        expect(selectors.getHasParameter(state, 'doesNotExist')).toEqual(false)
    })
})

describe('getDidFetch', () => {
    it('returns false if the parameter does not exist', () => {
        const state = {}
        const expected = false
        const actual = selectors.getDidFetch(state, 'jobType', 'parameterName')

        expect(actual).toEqual(expected)
    })

    it('returns whether the parameter has been fetched if it exists', () => {
        const state = { 'jobType/parameterName': { lastUpdated: 1 } }
        const expected = true
        const actual = selectors.getDidFetch(state, 'jobType', 'parameterName')

        expect(actual).toEqual(expected)
    })
})

describe('getErrorMessage', () => {
    it('returns an empty string if the parameter does not exist', () => {
        const state = {}
        const expected = ''
        const actual = selectors.getErrorMessage(
            state,
            'jobType',
            'parameterName'
        )

        expect(actual).toEqual(expected)
    })

    it('returns the errorMessage if the parameter exists', () => {
        const state = { 'jobType/parameterName': { errorMessage: 'error' } }
        const expected = 'error'
        const actual = selectors.getErrorMessage(
            state,
            'jobType',
            'parameterName'
        )

        expect(actual).toEqual(expected)
    })
})

describe('getParameterList', () => {
    it('returns an empty array if the parameter does not exist', () => {
        const state = {}
        const expected = []
        const actual = selectors.getParameterList(
            state,
            'jobType',
            'parameterName'
        )

        expect(actual).toEqual(expected)
    })

    it('returns the set of options if the parameter exists', () => {
        const state = { 'jobType/parameterName': { data: ['option'] } }
        const expected = ['option']
        const actual = selectors.getParameterList(
            state,
            'jobType',
            'parameterName'
        )

        expect(actual).toEqual(expected)
    })
})

describe('getShouldFetch', () => {
    const subState = {
        lastUpdated: 0,
        errorMessage: '',
        isFetching: false,
        data: [],
    }

    it('returns true if the parameter does not exist', () => {
        const expected = true
        const actual = selectors.getShouldFetch({}, 'jobType', 'parameterName')

        expect(actual).toEqual(expected)
    })

    it('returns false if it is currently fetching', () => {
        const state = {
            'jobType/parameterName': {
                ...subState,
                isFetching: true,
            },
        }
        const expected = false
        const actual = selectors.getShouldFetch(
            state,
            'jobType',
            'parameterName'
        )

        expect(actual).toEqual(expected)
    })

    it('should return true if the parameter has an error message', () => {
        const state = {
            'jobType/parameterName': {
                ...subState,
                errorMessage: 'error',
            },
        }
        const expected = true
        const actual = selectors.getShouldFetch(
            state,
            'jobType',
            'parameterName'
        )

        expect(actual).toEqual(expected)
    })

    it('should return true if it has not fetched yet', () => {
        const state = {
            'jobType/parameterName': {
                ...subState,
                lastUpdated: 0,
            },
        }
        const expected = true
        const actual = selectors.getShouldFetch(
            state,
            'jobType',
            'parameterName'
        )

        expect(actual).toEqual(expected)
    })
})
