import { combineReducers } from 'redux'
import me from './data/me'
import jobs from './data/jobs'
import jobTypes from './data/job-types'
import parameterSet from './data/parameter-set'
import modal from './data/modal'

export default combineReducers({
    me,
    jobs,
    jobTypes,
    parameterSet,
    modal,
})
