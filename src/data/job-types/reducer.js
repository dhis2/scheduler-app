import * as types from './actionTypes'

const fallbackMessage =
    'Something went wrong, but no errormessage was provided.'
const initialState = {
    lastUpdated: 0,
    errorMessage: '',
    isFetching: false,
    data: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_JOB_TYPES:
            return { ...state, isFetching: true }
        case types.FETCH_JOB_TYPES_SUCCESS:
            return {
                lastUpdated: action.meta.receivedAt,
                errorMessage: '',
                isFetching: false,
                data: action.payload,
            }
        case types.FETCH_JOB_TYPES_FAIL:
            return {
                ...state,
                lastUpdated: action.meta.receivedAt,
                errorMessage: action.error.message || fallbackMessage,
                isFetching: false,
            }
        default:
            return state
    }
}

export default reducer

/**
 * Selectors
 */

export const getDidFetch = state => !!state.lastUpdated
export const getErrorMessage = state => state.errorMessage
export const getIsFetching = state => state.isFetching
export const getJobTypes = state => {
    return Object.keys(state.data)
}

export const getShouldFetch = state => {
    const { isFetching, errorMessage, lastUpdated } = state
    const hasError = !!errorMessage
    const didFetch = !!lastUpdated

    if (isFetching) {
        return false
    }

    return hasError || !didFetch
}
