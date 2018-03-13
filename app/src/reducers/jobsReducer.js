import * as actions from 'constants/actions';

export const initialState = {
    all: [],
    loaded: false,
    dirty: false,
    showSystemJobs: false,
    changes: {
        parameters: null,
    },
    configuration: {
        loaded: false,
        types: [],
        statuses: [],
        parameters: {},
        attributeOptions: {},
    },
    pending: {
        update: false,
        delete: false,
    },
};

function jobsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.JOBS_LOAD_SUCCESS:
            return {
                ...state,
                all: action.payload.jobs,
                loaded: true,
            };

        case actions.JOB_DISCARD:
            return {
                ...state,
                changes: initialState.changes,
                dirty: false,
            };

        case actions.JOB_EDIT: {
            const field = action.payload.fieldName;

            return {
                ...state,
                dirty: true,
                changes: {
                    ...state.changes,
                    [field]: action.payload.value,
                },
            };
        }

        case actions.CONFIGURATION_LOAD_SUCCESS:
            return {
                ...state,
                configuration: {
                    ...state.configuration,
                    loaded: true,
                    types: action.payload.configuration.jobTypes,
                    statuses: action.payload.configuration.jobStatuses,
                    parameters: action.payload.configuration.jobParameters,
                },
            };

        case actions.ATTRIBUTE_OPTIONS_LOAD_SUCCESS:
            return {
                ...state,
                configuration: {
                    ...state.configuration,
                    attributeOptions: action.payload.attributeOptions,
                },
            };

        case actions.TOGGLE_SYSTEM_JOBS:
            return {
                ...state,
                showSystemJobs: action.payload.enabled,
            };

        default:
            return state;
    }
}

export default jobsReducer;
