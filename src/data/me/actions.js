import fetchy from '../../services/fetchy'
import * as rootSelectors from '../../rootSelectors'
import endpoints from '../../services/endpoints'
import * as types from './actionTypes'
import * as selectors from './reducer'

export const fetchMeSuccess = payload => ({
    type: types.FETCH_ME_SUCCESS,
    meta: {
        receivedAt: Date.now(),
    },
    payload,
})

export const fetchMeFail = error => ({
    type: types.FETCH_ME_FAIL,
    meta: {
        receivedAt: Date.now(),
    },
    error,
})

export const fetchMe = () => dispatch => {
    dispatch({ type: types.FETCH_ME })

    return fetchy(endpoints.me, { credentials: 'include' })
        .then(response => response.json())
        .then(data => dispatch(fetchMeSuccess(data)))
        .catch(error => dispatch(fetchMeFail(error)))
}

export const fetchMeIfNeeded = () => (dispatch, getState) => {
    const state = rootSelectors.getMe(getState())
    const shouldFetch = selectors.getShouldFetch(state)

    if (shouldFetch) {
        return dispatch(fetchMe())
    }

    return Promise.resolve()
}
