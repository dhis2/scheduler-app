import * as actions from "../constants/actionTypes";
import { combineEpics } from "redux-observable";
import "rxjs/add/operator/concatMap";
import { Observable } from "rxjs/Observable";
import * as api from "../api/api";

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

/*
const loadJobTypes = action$ =>
    action$.ofType(actions.JOB_TYPES_LOAD).concatMap(action =>
        api.getJobTypes()
           .then(jobTypes => ({ type: actions.JOB_TYPES_LOAD_SUCCESS, payload: { jobTypes  }))
           .catch(error => ({ type: actions.JOB_TYPES_LOAD_ERROR, payload: error })));
*/

const deleteJob = action$ =>
    action$.ofType(actions.JOB_DELETE).concatMap(({ payload: { id }}) =>
        api.deleteJob(id)
            .then(result => ({ type: actions.JOB_DELETE_SUCCESS, payload: { id } })))
            .catch(error => ({ type: actions.JOB_DELETE_ERROR, payload: { error }}));

export default combineEpics(
    loadJobs,
    loadConfiguration,
);