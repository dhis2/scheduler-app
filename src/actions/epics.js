import { combineEpics, ofType } from 'redux-observable';
import { concatMap, switchMap } from 'rxjs/operators';
import * as actions from '../constants/actions';
import history from '../utils/history';
import * as api from '../api/api';

const loadConfiguration = action$ =>
    action$.pipe(
        ofType(actions.CONFIGURATION_LOAD),
        concatMap(() =>
            api
                .getConfiguration()
                .then(configuration => ({
                    type: actions.CONFIGURATION_LOAD_SUCCESS,
                    payload: { configuration },
                }))
                .catch(error => ({ type: actions.CONFIGURATION_LOAD_ERROR, payload: { error } })),
        ),
    );

const loadAttributeOptions = action$ =>
    action$.pipe(
        ofType(actions.CONFIGURATION_LOAD_SUCCESS),
        concatMap(action =>
            api
                .getAttributeOptions(action.payload.configuration.jobParameters)
                .then(attributeOptions => ({
                    type: actions.ATTRIBUTE_OPTIONS_LOAD_SUCCESS,
                    payload: { attributeOptions },
                }))
                .catch(error => ({
                    type: actions.ATTRIBUTE_OPTIONS_LOAD_ERROR,
                    payload: { error },
                })),
        ),
    );

const loadJobs = action$ =>
    action$.pipe(
        ofType(
            actions.JOBS_LOAD,
            actions.JOB_POST_SUCCESS,
            actions.JOB_SAVE_SUCCESS,
            actions.JOB_DELETE_SUCCESS,
            actions.JOB_RUN_SUCCESS,
        ),
        concatMap(() =>
            api
                .getJobs()
                .then(jobs => ({ type: actions.JOBS_LOAD_SUCCESS, payload: { jobs } }))
                .catch(error => ({ type: actions.JOBS_LOAD_ERROR, payload: { error } })),
        ),
    );

const addJob = action$ =>
    action$.pipe(
        ofType(actions.JOB_POST),
        concatMap(action => {
            return api
                .postJob(action.payload.job)
                .then(result => {
                    history.replace('/');
                    return {
                        type: actions.JOB_POST_SUCCESS,
                        payload: { result },
                    };
                })
                .catch(error => ({ type: actions.JOB_POST_ERROR, payload: { error } }))
        }),
    );

const saveJob = action$ =>
    action$.pipe(
        ofType(actions.JOB_SAVE),
        switchMap(action => {
            const { jobParameters, ...job } = action.payload.job
            const toBeSaved = { ...job, jobParameters: jobParameters || {} }

            return api
                .saveJob(toBeSaved)
                .then(result => {
                    history.replace('/');
                    return {
                        type: actions.JOB_SAVE_SUCCESS,
                        payload: { result },
                    };
                })
                .catch(error => ({ type: actions.JOB_SAVE_ERROR, payload: { error } }))
        }),
    );

const deleteJob = action$ =>
    action$.pipe(
        ofType(actions.JOB_DELETE),
        switchMap(action =>
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
        ),
    );

const runJob = action$ =>
    action$.pipe(
        ofType(actions.JOB_RUN),
        switchMap(action =>
            api
                .runJob(action.payload.id)
                .then(() => ({
                    type: actions.JOB_RUN_SUCCESS,
                    payload: { id: action.payload.id },
                }))
                .catch(error => ({
                    type: actions.JOB_RUN_ERROR,
                    payload: { error },
                })),
        ),
    );

export default combineEpics(
    loadJobs,
    loadConfiguration,
    loadAttributeOptions,
    addJob,
    saveJob,
    deleteJob,
    runJob,
);
