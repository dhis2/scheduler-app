import * as actionTypes from 'constants/actionTypes';
import { parseParameters } from 'api/api';

const initialState = {
    all: [],
    loaded: false,
    selected: null,
    changes: {
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
                changes: initialState.changes,
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

        case actionTypes.JOB_EDIT:
            const field = action.payload.fieldName;
            if (field === 'type') {
                const type = action.payload.value;
                const availableJobParameters = {...state.configuration.parameters[type]};
                const parameters = parseParameters(availableJobParameters);

                return {
                    ...state,
                    changes: {
                        ...state.changes,
                        type,
                        parameters,
                    },
                };
            }

            return {
                ...state,
                changes: {
                    ...state.changes,
                    [field]: action.payload.value,
                },
            };

        case actionTypes.JOB_EDIT_CLEAR:
            return {
                ...state,
                changes: initialState.changes,
            };
    }

    return state;
}

export default jobsReducer;