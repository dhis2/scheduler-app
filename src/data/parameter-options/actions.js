import urlJoin from 'url-join'
import fetchy from '../../services/fetchy'
import * as rootSelectors from '../../rootSelectors'
import * as types from './actionTypes'
import * as selectors from './reducer'

/**
 * Fetch parameter options
 */

export const fetchParameterOptionsSuccess = (payload, meta) => ({
    type: types.FETCH_PARAMETER_OPTIONS_SUCCESS,
    meta: {
        ...meta,
        receivedAt: Date.now(),
    },
    payload,
})

export const fetchParameterOptionsFail = (error, meta) => ({
    type: types.FETCH_PARAMETER_OPTIONS_FAIL,
    meta: {
        ...meta,
        receivedAt: Date.now(),
    },
    error,
})

export const fetchParameterOptions = (endpoint, meta) => dispatch => {
    dispatch({ type: types.FETCH_PARAMETER_OPTIONS, meta })
    const base = process.env.REACT_APP_DHIS2_BASE_URL

    return fetchy(urlJoin(base, endpoint))
        .then(data => dispatch(fetchParameterOptionsSuccess(data, meta)))
        .catch(error => dispatch(fetchParameterOptionsFail(error, meta)))
}

export const fetchParameterOptionsIfNeeded = (
    endpoint,
    jobType,
    parameterName
) => (dispatch, getState) => {
    const meta = { jobType, parameterName }
    const state = rootSelectors.getParameterOptions(getState())
    const shouldFetch = selectors.getShouldFetch(state, jobType, parameterName)

    if (!shouldFetch) {
        return Promise.resolve()
    }

    return dispatch(fetchParameterOptions(endpoint, meta))
}
