import { combineReducers } from 'redux'
import me from './data/me'
import jobs from './data/jobs'
import jobTypes from './data/job-types'
import parameterSet from './data/parameter-set'
import parameterList from './data/parameter-list'
import modal from './data/modal'
import cronPreset from './data/cron-preset'

export default combineReducers({
    me,
    jobs,
    jobTypes,
    parameterSet,
    parameterList,
    modal,
    cronPreset,
})
