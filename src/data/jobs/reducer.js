import * as types from './actionTypes'

const initialState = {
    lastUpdated: 0,
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
        case types.CREATE_JOB:
            return { ...state, isFetching: true }
        case types.FETCH_JOBS_SUCCESS:
            return {
                lastUpdated: action.meta.receivedAt,
                errorMessage: '',
                isFetching: false,
                isDirty: false,
                result: action.payload.result,
            }
        case types.FETCH_JOBS_FAIL:
            return {
                ...state,
                lastUpdated: action.meta.receivedAt,
                errorMessage: action.error.message,
                isFetching: false,
            }
        case types.ENABLE_JOB_SUCCESS:
        case types.DISABLE_JOB_SUCCESS:
        case types.DELETE_JOB_SUCCESS:
        case types.RUN_JOB_SUCCESS:
        case types.CREATE_JOB_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isDirty: true,
            }
        case types.ENABLE_JOB_FAIL:
        case types.DISABLE_JOB_FAIL:
        case types.DELETE_JOB_FAIL:
        case types.RUN_JOB_FAIL:
        case types.CREATE_JOB_FAIL:
            return {
                ...state,
                errorMessage: action.error.message,
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
export const getIsDirty = state => state.isDirty
export const getResult = state => state.result

export const getShouldFetch = state => {
    const { isFetching, isDirty, errorMessage, lastUpdated } = state
    const hasError = !!errorMessage
    const didFetch = !!lastUpdated

    if (isFetching) {
        return false
    }

    return hasError || isDirty || !didFetch
}
