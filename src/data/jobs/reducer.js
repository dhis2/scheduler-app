import * as types from './actionTypes'

const fallbackMessage =
    'Something went wrong, but no errormessage was provided.'
const initialState = {
    lastUpdated: 0,
    errorMessage: '',
    isFetching: false,
    entities: {},
    ids: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_JOBS:
            return Object.assign({}, state, { isFetching: true })
        case types.FETCH_JOBS_SUCCESS:
            return {
                lastUpdated: action.meta.receivedAt,
                errorMessage: '',
                isFetching: false,
                entities: action.payload.entities.jobs,
                ids: action.payload.result,
            }
        case types.FETCH_JOBS_FAIL:
            return Object.assign({}, state, {
                lastUpdated: action.meta.receivedAt,
                errorMessage: action.error.message || fallbackMessage,
                isFetching: false,
            })
        default:
            return state
    }
}

export default reducer

/**
 * Selectors
 */

export const getIsFetching = state => state.isFetching
export const getErrorMessage = state => state.errorMessage
export const getEntities = state => state.entities
export const getIds = state => state.ids

export const getShouldFetch = state => {
    const { isFetching, errorMessage, lastUpdated } = state
    const hasError = !!errorMessage
    const didFetch = !!lastUpdated

    if (isFetching) {
        return false
    }

    // Fetch if there's an error or if it hasn't fetched yet
    return hasError || !didFetch
}
