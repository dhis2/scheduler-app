import * as actionTypes from 'constants/actionTypes';

const initialState = {
    all: [],
    loaded: false,
    dirty: false,
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
};

function jobsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.JOBS_LOAD_SUCCESS:
            return {
                ...state,
                all: action.payload.jobs,
                loaded: true,
            };

        case actionTypes.JOB_DISCARD:
            return {
                ...state,
                changes: initialState.changes,
                dirty: false,
            };

        case actionTypes.JOB_EDIT: {
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

        case actionTypes.CONFIGURATION_LOAD_SUCCESS:
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

        case actionTypes.ATTRIBUTE_OPTIONS_LOAD_SUCCESS:
            return {
                ...state,
                configuration: {
                    ...state.configuration,
                    attributeOptions: action.payload.attributeOptions,
                },
            };

        default:
            return state;
    }
}

export default jobsReducer;
