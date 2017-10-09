import * as actions from 'constants/actionTypes';
import { combineEpics } from 'redux-observable';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import * as api from 'api/api';

const loadConfiguration = action$ =>
    action$.ofType(actions.CONFIGURATION_LOAD).concatMap(action =>
        api.getConfiguration()
            .then(configuration => ({ type: actions.CONFIGURATION_LOAD_SUCCESS, payload: { configuration } }))
            .catch(error => ({ type: actions.CONFIGURATION_LOAD_ERROR, payload: { error } })));

const loadJobs = action$ =>
    action$.ofType(actions.JOBS_LOAD).concatMap(action =>
        api.getJobs()
           .then(jobs => ({ type: actions.JOBS_LOAD_SUCCESS, payload: { jobs } }))
           .catch(error => ({ type: actions.JOBS_LOAD_ERROR, payload: { error } })));

const deleteJob = action$ =>
    action$.ofType(actions.JOB_DELETE).concatMap(action =>
        api.deleteJob(action.payload.id)
            .then(() => ({ type: actions.JOB_DELETE_SUCCESS, payload: { id: action.payload.id } }))
            .catch(error => ({ type: actions.JOB_DELETE_ERROR, payload: { error }})));

export default combineEpics(
    loadJobs,
    loadConfiguration,
    deleteJob,
);