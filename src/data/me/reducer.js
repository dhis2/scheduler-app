import cloneDeep from 'clone-deep'
import * as types from './actionTypes'

const initialState = {
    lastUpdated: 0,
    errorMessage: '',
    isFetching: false,
    data: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_ME:
            return { ...cloneDeep(state), isFetching: true }
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
                errorMessage: action.error.message,
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

export const getDidFetch = state => !!state.lastUpdated
export const getErrorMessage = state => state.errorMessage
export const getIsFetching = state => state.isFetching

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
    const didFetch = !!lastUpdated
    const hasAuthorities = !!authorities

    if (isFetching || hasAuthorities) {
        return false
    }

    // Fetch if there's an error or if it hasn't fetched yet
    return hasError || !didFetch
}
