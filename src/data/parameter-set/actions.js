import urlJoin from 'url-join'
import fetchy from '../../services/fetchy'
import * as rootSelectors from '../../rootSelectors'
import * as types from './actionTypes'
import * as selectors from './reducer'

/**
 * Fetch parameter set
 */

export const fetchParameterSetSuccess = (payload, meta) => ({
    type: types.FETCH_PARAMETER_SET_SUCCESS,
    meta: {
        ...meta,
        receivedAt: Date.now(),
    },
    payload,
})

export const fetchParameterSetFail = (error, meta) => ({
    type: types.FETCH_PARAMETER_SET_FAIL,
    meta: {
        ...meta,
        receivedAt: Date.now(),
    },
    error,
})

export const fetchParameterSet = (endpoint, meta) => dispatch => {
    dispatch({ type: types.FETCH_PARAMETER_SET, meta })
    const base = process.env.REACT_APP_DHIS2_BASE_URL

    return fetchy(urlJoin(base, endpoint))
        .then(data => dispatch(fetchParameterSetSuccess(data, meta)))
        .catch(error => dispatch(fetchParameterSetFail(error, meta)))
}

export const fetchParameterSetIfNeeded = (endpoint, jobType, parameterName) => (
    dispatch,
    getState
) => {
    const meta = { jobType, parameterName }
    const state = rootSelectors.getParameterSet(getState())
    const shouldFetch = selectors.getShouldFetch(state, jobType, parameterName)

    if (!shouldFetch) {
        return Promise.resolve()
    }

    return dispatch(fetchParameterSet(endpoint, meta))
}
