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

export const getUserJobIds = state => {
    const { jobs } = state

    const userJobIds = Object.keys(jobs).filter(id => jobs[id].configurable)

    return userJobIds
}
