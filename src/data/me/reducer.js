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
            return Object.assign({}, state, { isFetching: true })
        case types.FETCH_ME_SUCCESS:
            return {
                lastUpdated: action.meta.receivedAt,
                errorMessage: '',
                isFetching: false,
                data: action.payload,
            }
        case types.FETCH_ME_FAIL:
            return Object.assign({}, state, {
                lastUpdated: action.meta.receivedAt,
                errorMessage: action.error.message || fallbackMessage,
                isFetching: false,
                data: {},
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
        isFetching,
        errorMessage,
        data: { authorities },
        lastUpdated,
    } = state
    const hasError = !!errorMessage
    const didFetch = !!lastUpdated
    const hasAuthorities = !!authorities

    if (isFetching || hasAuthorities) {
        return false
    }

    // Fetch if there's an error, if it hasn't fetched yet or there are no authorities
    return hasError || !didFetch || !hasAuthorities
}
