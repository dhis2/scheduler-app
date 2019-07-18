import fetchy from '../../services/fetchy'
import * as rootSelectors from '../../rootSelectors'
import endpoints from '../../services/endpoints'
import * as types from './actionTypes'
import * as selectors from './reducer'

/**
 * Fetch job-types
 */

export const fetchJobTypesSuccess = payload => ({
    type: types.FETCH_JOB_TYPES_SUCCESS,
    meta: {
        receivedAt: Date.now(),
    },
    payload,
})

export const fetchJobTypesFail = error => ({
    type: types.FETCH_JOB_TYPES_FAIL,
    meta: {
        receivedAt: Date.now(),
    },
    error,
})

export const fetchJobTypes = () => dispatch => {
    dispatch({ type: types.FETCH_JOB_TYPES })

    return fetchy(endpoints.jobTypes)
        .then(data => dispatch(fetchJobTypesSuccess(data)))
        .catch(error => dispatch(fetchJobTypesFail(error)))
}

export const fetchJobTypesIfNeeded = () => (dispatch, getState) => {
    const state = rootSelectors.getJobTypes(getState())
    const shouldFetch = selectors.getShouldFetch(state)

    if (!shouldFetch) {
        return Promise.resolve()
    }

    return dispatch(fetchJobTypes())
}
