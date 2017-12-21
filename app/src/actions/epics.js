import * as actions from 'constants/actionTypes';
import { combineEpics } from 'redux-observable';
import { Observable, concatMap } from 'rxjs';

import history from '../history';
import * as api from 'api/api';

const loadConfiguration = action$ =>
    action$.ofType(actions.CONFIGURATION_LOAD).concatMap(action =>
        api
            .getConfiguration()
            .then(configuration => ({
                type: actions.CONFIGURATION_LOAD_SUCCESS,
                payload: { configuration },
            }))
            .catch(error => ({ type: actions.CONFIGURATION_LOAD_ERROR, payload: { error } })),
    );

const loadAttributeOptions = action$ =>
    action$.ofType(actions.CONFIGURATION_LOAD_SUCCESS).concatMap(action =>
        api
            .getAttributeOptions(action.payload.configuration.jobParameters)
            .then(attributeOptions => ({
                type: actions.ATTRIBUTE_OPTIONS_LOAD_SUCCESS,
                payload: { attributeOptions },
            }))
            .catch(error => ({ type: actions.ATTRIBUTE_OPTIONS_LOAD_ERROR, payload: { error } })),
    );

const loadJobs = action$ =>
    action$
        .ofType(
            actions.JOBS_LOAD,
            actions.JOB_POST_SUCCESS,
            actions.JOB_SAVE_SUCCESS,
            actions.JOB_DELETE_SUCCESS,
        )
        .concatMap(action =>
            api
                .getJobs()
                .then(jobs => ({ type: actions.JOBS_LOAD_SUCCESS, payload: { jobs } }))
                .catch(error => ({ type: actions.JOBS_LOAD_ERROR, payload: { error } })),
        );

const addJob = action$ =>
    action$.ofType(actions.JOB_POST).concatMap(action =>
        api
            .postJob(action.payload.job)
            .then(result => {
                history.replace('/');
                return {
                    type: actions.JOB_POST_SUCCESS,
                    payload: { result },
                };
            })
            .catch(error => ({ type: actions.JOB_POST_ERROR, payload: { error } })),
    );

const saveJob = action$ =>
    action$.ofType(actions.JOB_SAVE).concatMap(action =>
        api
            .saveJob(action.payload.job)
            .then(result => {
                history.replace('/');
                return {
                    type: actions.JOB_SAVE_SUCCESS,
                    payload: { result },
                };
            })
            .catch(error => ({ type: actions.JOB_SAVE_ERROR, payload: { error } })),
    );

const deleteJob = action$ =>
    action$.ofType(actions.JOB_DELETE).concatMap(action =>
        api
            .deleteJob(action.payload.id)
            .then(() => {
                history.replace('/');
                return {
                    type: actions.JOB_DELETE_SUCCESS,
                    payload: { id: action.payload.id },
                };
            })
            .catch(error => ({ type: actions.JOB_DELETE_ERROR, payload: { error } })),
    );

export default combineEpics(
    loadJobs,
    loadConfiguration,
    loadAttributeOptions,
    addJob,
    saveJob,
    deleteJob,
);
