import * as types from './actionTypes'

const fallbackMessage =
    'Something went wrong, but no errormessage was provided.'
const initialState = {
    didFetchSuccessfully: false,
    errorMessage: '',
    isFetching: false,
    isDirty: false,
    result: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_JOBS:
        case types.ENABLE_JOB:
        case types.DISABLE_JOB:
        case types.DELETE_JOB:
        case types.RUN_JOB:
            return { ...state, isFetching: true }
        case types.FETCH_JOBS_SUCCESS:
            return {
                didFetchSuccessfully: true,
                errorMessage: '',
                isFetching: false,
                isDirty: false,
                result: action.payload.result,
            }
        case types.FETCH_JOBS_FAIL:
        case types.ENABLE_JOB_FAIL:
        case types.DISABLE_JOB_FAIL:
        case types.DELETE_JOB_FAIL:
        case types.RUN_JOB_FAIL:
            return {
                ...state,
                errorMessage: action.error.message || fallbackMessage,
                isFetching: false,
            }
        case types.ENABLE_JOB_SUCCESS:
        case types.DISABLE_JOB_SUCCESS:
        case types.DELETE_JOB_SUCCESS:
        case types.RUN_JOB_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isDirty: true,
            }
        default:
            return state
    }
}

export default reducer

/**
 * Selectors
 */

export const getDidFetchSuccessfully = state => state.didFetchSuccessfully
export const getIsFetching = state => state.isFetching
export const getErrorMessage = state => state.errorMessage
export const getResult = state => state.result

export const getShouldFetch = state => {
    const { isFetching, isDirty, errorMessage, didFetchSuccessfully } = state
    const hasError = !!errorMessage

    if (isFetching) {
        return false
    }

    return hasError || isDirty || !didFetchSuccessfully
}
