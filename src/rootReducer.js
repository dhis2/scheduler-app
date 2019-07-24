import { combineReducers } from 'redux'
import me from './data/me'
import jobs from './data/jobs'
import jobTypes from './data/job-types'
import modal from './data/modal'

export default combineReducers({
    me,
    jobs,
    jobTypes,
    modal,
})
