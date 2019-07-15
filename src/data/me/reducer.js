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
        case types.FETCH_ME:
            return { ...state, isFetching: true }
        case types.FETCH_ME_SUCCESS:
            return {
                lastUpdated: action.meta.receivedAt,
                errorMessage: '',
                isFetching: false,
                data: action.payload,
            }
        case types.FETCH_ME_FAIL:
            return {
                lastUpdated: action.meta.receivedAt,
                errorMessage: action.error.message || fallbackMessage,
                isFetching: false,
                data: {},
            }
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
export const getDidFetch = state => !!state.lastUpdated

export const getIsAuthorized = state => {
    const { authorities } = state.data

    if (!authorities) {
        return false
    }

    const isAuthorized =
        authorities.includes('ALL') ||
        authorities.includes('F_SCHEDULING_ADMIN')

    return isAuthorized
}

export const getShouldFetch = state => {
    const {
        lastUpdated,
        isFetching,
        errorMessage,
        data: { authorities },
    } = state
    const hasError = !!errorMessage
    const hasFetched = !!lastUpdated
    const hasAuthorities = !!authorities

    if (isFetching || hasAuthorities) {
        return false
    }

    // Fetch if there's an error or if it hasn't fetched yet
    return hasError || !hasFetched
}
