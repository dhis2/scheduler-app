import { normalize } from 'normalizr'
import fetchy from '../../services/fetchy'
import * as rootSelectors from '../../rootSelectors'
import endpoints from '../../services/endpoints'
import * as types from './actionTypes'
import * as schemas from './schemas'
import * as selectors from './reducer'

export const fetchJobsSuccess = payload => ({
    type: types.FETCH_JOBS_SUCCESS,
    meta: {
        receivedAt: Date.now(),
    },
    payload,
})

export const fetchJobsFail = error => ({
    type: types.FETCH_JOBS_FAIL,
    meta: {
        receivedAt: Date.now(),
    },
    error,
})

export const fetchJobs = () => dispatch => {
    dispatch({ type: types.FETCH_JOBS })

    return fetchy(`${endpoints.jobs}?fields=*`, { credentials: 'include' })
        .then(response => response.json())
        .then(data => normalize(data.jobConfigurations, [schemas.jobs]))
        .then(normalized => dispatch(fetchJobsSuccess(normalized)))
        .catch(error => dispatch(fetchJobsFail(error)))
}

export const fetchJobsIfNeeded = () => (dispatch, getState) => {
    const state = rootSelectors.getJobs(getState())
    const shouldFetch = selectors.getShouldFetch(state)

    if (shouldFetch) {
        return dispatch(fetchJobs())
    }

    return Promise.resolve()
}
