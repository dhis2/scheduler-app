import merge from 'lodash.merge'

const initialState = {
    jobs: {},
}

const reducer = (state = initialState, action) => {
    if (action.payload && action.payload.entities) {
        return merge({}, state, action.payload.entities)
    }

    return state
}

export default reducer

/**
 * Selectors
 */

export const getJobs = state => state.jobs
