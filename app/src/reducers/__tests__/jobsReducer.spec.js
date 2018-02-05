import reducer, { initialState } from 'reducers/jobsReducer';
import * as actions from 'constants/actions';

describe('jobsReducer', () => {
    it('should return the initial state', () => {
        const expectedState = { ...initialState };

        const actualState = reducer(undefined, {});
        expect(actualState).toEqual(expectedState);
    });

    it('should handle JOBS_LOAD_SUCCESS', () => {
        const jobs = [{ displayName: 'testJob' }, { displayName: 'testJob2' }];

        const action = {
            type: actions.JOBS_LOAD_SUCCESS,
            payload: { jobs },
        };

        const expectedState = {
            ...initialState,
            all: jobs,
            loaded: true,
        };

        const actualState = reducer(initialState, action);
        expect(actualState).toEqual(expectedState);
    });

    it('should handle JOB_EDIT', () => {
        const action = {
            type: actions.JOB_EDIT,
            payload: {
                fieldName: 'name',
                value: 'New job name',
            },
        };
        const expectedState = {
            ...initialState,
            dirty: true,
            changes: {
                parameters: null,
                name: 'New job name',
            },
        };

        const actualState = reducer(initialState, action);
        expect(actualState).toEqual(expectedState);
    });

    it('should handle JOB_DISCARD', () => {
        const action = {
            type: actions.JOB_DISCARD,
        };

        const dirtyState = {
            ...initialState,
            dirty: true,
            changes: {
                parameters: {
                    paramField: 'Param value',
                },
                name: 'Name',
            },
        };

        const expectedState = {
            ...initialState,
            changes: initialState.changes,
            dirty: false,
        };

        const actualState = reducer(dirtyState, action);
        expect(actualState).toEqual(expectedState);
    });

    it('should handle CONFIGURATION_LOAD_SUCCESS', () => {
        const jobTypes = ['SEND_SCHEDULED_MESSAGE', 'RUN_ANALYTICS'];
        const jobStatuses = ['RUNNING, HALTED'];
        const jobParameters = {
            SEND_SCHEDULED_MESSAGE: null,
            RUN_ANALYTICS: null,
        };

        const action = {
            type: actions.CONFIGURATION_LOAD_SUCCESS,
            payload: {
                configuration: {
                    loaded: true,
                    jobTypes,
                    jobStatuses,
                    jobParameters,
                },
            },
        };

        const expectedState = {
            ...initialState,
            configuration: {
                loaded: true,
                types: jobTypes,
                statuses: jobStatuses,
                parameters: jobParameters,
                attributeOptions: {},
            },
        };

        const actualState = reducer(initialState, action);
        expect(actualState).toEqual(expectedState);
    });

    it('should handle ATTRIBUTE_OPTIONS_LOAD_SUCCESS', () => {
        const attributeOptions = {
            RUN_ANALYTICS: {
                skipTableTypes: ['DATA_VALUE'],
            },
        };

        const action = {
            type: actions.ATTRIBUTE_OPTIONS_LOAD_SUCCESS,
            payload: {
                attributeOptions,
            },
        };

        const expectedState = {
            ...initialState,
            configuration: {
                ...initialState.configuration,
                attributeOptions,
            },
        };

        const actualState = reducer(initialState, action);
        expect(actualState).toEqual(expectedState);
    });
});
