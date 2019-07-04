import { combineReducers } from 'redux'
import me from './data/me'
import jobs from './data/jobs'

export default combineReducers({
    me,
    jobs,
})
