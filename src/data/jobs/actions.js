import { normalize } from 'normalizr'
import urlJoin from 'url-join'
import fetchy from '../../services/fetchy'
import * as rootSelectors from '../../rootSelectors'
import endpoints from '../../services/endpoints'
import * as types from './actionTypes'
import * as schemas from './schemas'
import * as selectors from './reducer'

/**
 * Fetch jobs
 */

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

    return fetchy(urlJoin(endpoints.jobs, '?fields=*'), {
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => normalize(data.jobConfigurations, [schemas.jobs]))
        .then(normalized => dispatch(fetchJobsSuccess(normalized)))
        .catch(error => dispatch(fetchJobsFail(error)))
}

export const fetchJobsIfNeeded = () => (dispatch, getState) => {
    const state = rootSelectors.getJobs(getState())
    const shouldFetch = selectors.getShouldFetch(state)

    if (!shouldFetch) {
        return Promise.resolve()
    }

    return dispatch(fetchJobs())
}

/**
 * Enable job
 */

export const enableJobSuccess = () => ({
    type: types.ENABLE_JOB_SUCCESS,
})

export const enableJobFail = error => ({
    type: types.ENABLE_JOB_FAIL,
    error,
})

export const enableJob = id => dispatch => {
    dispatch({ type: types.ENABLE_JOB })

    const fetchOptions = {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            enabled: true,
        }),
    }

    return fetchy(urlJoin(endpoints.jobs, `/${id}`), fetchOptions)
        .then(() => dispatch(enableJobSuccess()))
        .then(() => dispatch(fetchJobsIfNeeded()))
        .catch(error => dispatch(enableJobFail(error)))
}

/**
 * Disable job
 */

export const disableJobSuccess = () => ({
    type: types.DISABLE_JOB_SUCCESS,
})

export const disableJobFail = error => ({
    type: types.DISABLE_JOB_FAIL,
    error,
})

export const disableJob = id => dispatch => {
    dispatch({ type: types.DISABLE_JOB })

    const fetchOptions = {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            enabled: false,
        }),
    }

    return fetchy(urlJoin(endpoints.jobs, `/${id}`), fetchOptions)
        .then(() => dispatch(disableJobSuccess()))
        .then(() => dispatch(fetchJobsIfNeeded()))
        .catch(error => dispatch(disableJobFail(error)))
}

/**
 * Delete job
 */

export const deleteJobSuccess = () => ({
    type: types.DELETE_JOB_SUCCESS,
})

export const deleteJobFail = error => ({
    type: types.DELETE_JOB_FAIL,
    error,
})

export const deleteJob = id => dispatch => {
    dispatch({ type: types.DELETE_JOB })

    const fetchOptions = {
        method: 'DELETE',
        credentials: 'include',
    }

    return fetchy(urlJoin(endpoints.jobs, `/${id}`), fetchOptions)
        .then(() => dispatch(deleteJobSuccess()))
        .then(() => dispatch(fetchJobsIfNeeded()))
        .catch(error => dispatch(deleteJobFail(error)))
}

/**
 * Run job
 */

export const runJobSuccess = () => ({
    type: types.RUN_JOB_SUCCESS,
})

export const runJobFail = error => ({
    type: types.RUN_JOB_FAIL,
    error,
})

export const runJob = id => dispatch => {
    dispatch({ type: types.RUN_JOB })

    return fetchy(urlJoin(endpoints.jobs, `/${id}/execute`), {
        credentials: 'include',
    })
        .then(() => dispatch(runJobSuccess()))
        .then(() => dispatch(fetchJobsIfNeeded()))
        .catch(error => dispatch(runJobFail(error)))
}

/**
 * Create job
 */

export const createJobSuccess = () => ({
    type: types.CREATE_JOB_SUCCESS,
})

export const createJobFail = error => ({
    type: types.CREATE_JOB_FAIL,
    error,
})

export const createJob = job => dispatch => {
    dispatch({ type: types.CREATE_JOB })

    const fetchOptions = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
    }

    return fetchy(endpoints.jobs, fetchOptions)
        .then(() => dispatch(createJobSuccess()))
        .then(() => dispatch(fetchJobsIfNeeded()))
        .catch(error => dispatch(createJobFail(error)))
}
