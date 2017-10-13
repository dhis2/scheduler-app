import * as actionTypes from "constants/actionTypes";

const initialState = {
    job: {
        cronExpression: '',
        type: '',
        name: '',
        parameters: {},
    },
    configuration: {
        jobTypes: [],
        jobStatuses: [],
        jobParameters: [],
    },
};

function editReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CONFIGURATION_LOAD_SUCCESS:
            return {
                ...state,
                configuration: {
                    jobTypes: action.payload.configuration.jobTypes,
                    jobStatuses: action.payload.configuration.jobStatuses,
                    jobParameters: action.payload.configuration.jobParameters,
                },
            };

        case actionTypes.EDIT_CLEAR:
            return initialState;

        case actionTypes.EDIT_CRON_EXPRESSION:
            return {
                ...state,
                job: {
                    ...state.job,
                    cronExpression: action.payload.cronExpression,
                },
            }

        case actionTypes.EDIT_NAME:
            return {
                ...state,
                job: {
                    ...state.job,
                    name: action.payload.name,
                },
            }

        case actionTypes.EDIT_TYPE_SUCCESS:
            return {
                ...state,
                job: {
                    ...state.job,
                    type: action.payload.type,
                    parameters: action.payload.parameters,
                },
            };

        case actionTypes.EDIT_PARAMETERS:
            return {
                ...state,
                job: {
                    ...state.job,
                    parameters: action.payload.parameters,
                },
            };
    }

    return state;
}

export default editReducer;