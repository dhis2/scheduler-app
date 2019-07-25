import cloneDeep from 'clone-deep'
import * as types from './actionTypes'

const initialState = {}
const initialSubState = {
    lastUpdated: 0,
    errorMessage: '',
    isFetching: false,
    data: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_PARAMETER_OPTIONS: {
            const parameterKey = getParameterKey(
                action.meta.jobType,
                action.meta.parameterName
            )
            const currentState = getCurrentState(state, parameterKey)

            currentState[parameterKey] = {
                ...currentState[parameterKey],
                isFetching: true,
            }

            return currentState
        }
        case types.FETCH_PARAMETER_OPTIONS_SUCCESS: {
            const parameterKey = getParameterKey(
                action.meta.jobType,
                action.meta.parameterName
            )
            const currentState = getCurrentState(state, parameterKey)

            currentState[parameterKey] = {
                lastUpdated: action.meta.receivedAt,
                errorMessage: '',
                isFetching: false,
                data: action.payload,
            }

            return currentState
        }
        case types.FETCH_PARAMETER_OPTIONS_FAIL: {
            const parameterKey = getParameterKey(
                action.meta.jobType,
                action.meta.parameterName
            )
            const currentState = getCurrentState(state, parameterKey)

            currentState[parameterKey] = {
                ...currentState[parameterKey],
                lastUpdated: action.meta.receivedAt,
                errorMessage: action.error.message,
                isFetching: false,
            }

            return currentState
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

export const getParameterOptions = (state, jobType, parameterName) => {
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

const getCurrentState = (state, parameterKey) => {
    const hasParameter = getHasParameter(state, parameterKey)
    const clonedState = cloneDeep(state)

    if (hasParameter) {
        return clonedState
    }

    clonedState[parameterKey] = cloneDeep(initialSubState)

    return clonedState
}
