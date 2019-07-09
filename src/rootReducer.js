import { combineReducers } from 'redux'
import me from './data/me'
import jobs from './data/jobs'
import entities from './data/entities'

export default combineReducers({
    me,
    jobs,
    entities,
})
