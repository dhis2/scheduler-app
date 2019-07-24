import * as types from './actionTypes'

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
export const getJobTypes = state => {
    return Object.keys(state.data)
}

/**
 * Returns the name, type and label of a parameter of a job. Useful to map it to an input field.
 */

export const getJobTypeParameter = (state, jobType, parameterName) => {
    const data = state.data
    const job = data[jobType]
    const parameter = job[parameterName]

    return {
        name: parameter.name,
        type: parameter.klass,
        label: parameter.fieldName,
    }
}

/**
 * Returns an array with all parameters for a certain jobType
 */

export const getJobTypeParameters = (state, jobType) => {
    const data = state.data
    const parameterNames = Object.keys(data[jobType])

    return parameterNames.map(parameterName =>
        getJobTypeParameter(state, jobType, parameterName)
    )
}

/**
 * Returns the relativeApiEndpoint prop of a jobType's parameter, if it exists. This can be used to
 * retrieve the options for this parameter.
 */

export const getParameterOptionEndpoint = (state, jobType, parameterName) => {
    const data = state.data
    const job = data[jobType]
    const parameter = job[parameterName]

    return parameter.relativeApiEndpoint
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
