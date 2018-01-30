import * as actions from 'constants/actions';

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

        default:
            return state;
    }
}

export default jobsReducer;
