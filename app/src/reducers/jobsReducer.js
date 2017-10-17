import * as actionTypes from 'constants/actionTypes';

const initialState = {
    all: [],
    loaded: false,
    selected: null,
    new: {
        cronExpression: '',
        type: '',
        name: '',
        parameters: [],
    },
    configuration: {
        types: [],
        statuses: [],
        parameters: [],
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

        case actionTypes.JOB_SELECT:
            return {
                ...state,
                selected: action.payload.id,
            };

        case actionTypes.JOB_DELETE_SUCCESS:
            return {
                ...state,
                selected: state.selected === action.payload.id
                    ? null
                    : state.selected,
            };

        case actionTypes.JOB_DELETE_ERROR:
            return state;

        case actionTypes.CONFIGURATION_LOAD_SUCCESS:
            return {
                ...state,
                configuration: {
                    types: action.payload.configuration.jobTypes,
                    statuses: action.payload.configuration.jobStatuses,
                    parameters: action.payload.configuration.jobParameters,
                },
            };

        case actionTypes.EDIT_CLEAR:
            return {
                ...state,
                new: initialState.new,
            };

        case actionTypes.EDIT_CRON_EXPRESSION:
            return {
                ...state,
                new: {
                    ...state.new,
                    cronExpression: action.payload.cronExpression,
                },
            }

        case actionTypes.EDIT_NAME:
            return {
                ...state,
                new: {
                    ...state.new,
                    name: action.payload.name,
                },
            }

        case actionTypes.EDIT_TYPE_SUCCESS:
            return {
                ...state,
                new: {
                    ...state.new,
                    type: action.payload.type,
                    parameters: action.payload.parameters,
                },
            };

        case actionTypes.EDIT_PARAMETERS:
            return {
                ...state,
                new: {
                    ...state.new,
                    parameters: action.payload.parameters,
                },
            };
    }

    return state;
}

export default jobsReducer;