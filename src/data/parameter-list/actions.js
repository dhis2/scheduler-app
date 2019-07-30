import urlJoin from 'url-join'
import fetchy from '../../services/fetchy'
import * as rootSelectors from '../../rootSelectors'
import * as types from './actionTypes'
import * as selectors from './reducer'

/**
 * Fetch parameter list
 */

export const fetchParameterListSuccess = (payload, meta) => ({
    type: types.FETCH_PARAMETER_LIST_SUCCESS,
    meta: {
        ...meta,
        receivedAt: Date.now(),
    },
    // The backend returns an object with the data we want nested under the parameterName
    payload: payload[meta.parameterName],
})

export const fetchParameterListFail = (error, meta) => ({
    type: types.FETCH_PARAMETER_LIST_FAIL,
    meta: {
        ...meta,
        receivedAt: Date.now(),
    },
    error,
})

export const fetchParameterList = (endpoint, meta) => dispatch => {
    dispatch({ type: types.FETCH_PARAMETER_LIST, meta })
    const base = process.env.REACT_APP_DHIS2_BASE_URL

    return fetchy(urlJoin(base, endpoint, '?paging=false'))
        .then(data => dispatch(fetchParameterListSuccess(data, meta)))
        .catch(error => dispatch(fetchParameterListFail(error, meta)))
}

export const fetchParameterListIfNeeded = (
    endpoint,
    jobType,
    parameterName
) => (dispatch, getState) => {
    const meta = { jobType, parameterName }
    const state = rootSelectors.getParameterList(getState())
    const shouldFetch = selectors.getShouldFetch(state, jobType, parameterName)

    if (!shouldFetch) {
        return Promise.resolve()
    }

    return dispatch(fetchParameterList(endpoint, meta))
}
