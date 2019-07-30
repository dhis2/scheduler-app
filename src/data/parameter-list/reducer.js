import * as types from './actionTypes'

const initialState = {}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_PARAMETER_LIST: {
            const { jobType, parameterName } = action.meta
            const parameterKey = getParameterKey(jobType, parameterName)
            const subState = getSubState(state, parameterKey)

            return {
                ...state,
                [parameterKey]: {
                    ...subState,
                    isFetching: true,
                },
            }
        }
        case types.FETCH_PARAMETER_LIST_SUCCESS: {
            const { jobType, parameterName } = action.meta
            const parameterKey = getParameterKey(jobType, parameterName)

            return {
                ...state,
                [parameterKey]: {
                    lastUpdated: action.meta.receivedAt,
                    errorMessage: '',
                    isFetching: false,
                    data: action.payload,
                },
            }
        }
        case types.FETCH_PARAMETER_LIST_FAIL: {
            const { jobType, parameterName } = action.meta
            const parameterKey = getParameterKey(jobType, parameterName)

            return {
                ...state,
                [parameterKey]: {
                    lastUpdated: action.meta.receivedAt,
                    errorMessage: action.error.message,
                    isFetching: false,
                    data: [],
                },
            }
        }
        default:
            return state
    }
}

export default reducer

/**
 * Selectors
 */

export const getParameterKey = (jobType, parameterName) =>
    `${jobType}/${parameterName}`

export const getHasParameter = (state, parameterKey) => parameterKey in state

export const getDidFetch = (state, jobType, parameterName) => {
    const parameterKey = getParameterKey(jobType, parameterName)
    const hasParameter = getHasParameter(state, parameterKey)

    if (!hasParameter) {
        return false
    }

    return !!state[parameterKey].lastUpdated
}

export const getErrorMessage = (state, jobType, parameterName) => {
    const parameterKey = getParameterKey(jobType, parameterName)
    const hasParameter = getHasParameter(state, parameterKey)

    if (!hasParameter) {
        return ''
    }

    return state[parameterKey].errorMessage
}

export const getShouldFetch = (state, jobType, parameterName) => {
    const parameterKey = getParameterKey(jobType, parameterName)
    const hasParameter = getHasParameter(state, parameterKey)

    if (!hasParameter) {
        return true
    }

    const { isFetching, errorMessage, lastUpdated } = state[parameterKey]
    const hasError = !!errorMessage
    const didFetch = !!lastUpdated

    if (isFetching) {
        return false
    }

    return hasError || !didFetch
}

export const getParameterList = (state, jobType, parameterName) => {
    const parameterKey = getParameterKey(jobType, parameterName)
    const hasParameter = getHasParameter(state, parameterKey)

    if (!hasParameter) {
        return []
    }

    return state[parameterKey].data
}

/**
 * Redux helpers
 */

const getSubState = (state, parameterKey) => {
    const hasParameter = getHasParameter(state, parameterKey)

    if (hasParameter) {
        return state[parameterKey]
    }

    return {
        lastUpdated: 0,
        errorMessage: '',
        isFetching: false,
        data: [],
    }
}
