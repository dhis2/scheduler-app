import * as types from './actionTypes'

const fallbackMessage =
    'Something went wrong, but no errormessage was provided.'
const initialState = {
    didFetchSuccessfully: false,
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
                didFetchSuccessfully: true,
                errorMessage: '',
                isFetching: false,
                data: action.payload,
            }
        case types.FETCH_ME_FAIL:
            return {
                ...state,
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
        didFetchSuccessfully,
    } = state
    const hasError = !!errorMessage
    const hasAuthorities = !!authorities

    if (isFetching || hasAuthorities) {
        return false
    }

    // Fetch if there's an error, if it hasn't fetched yet or there are no authorities
    return hasError || !didFetchSuccessfully || !hasAuthorities
}
