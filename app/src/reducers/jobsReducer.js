import * as actionTypes from 'constants/actionTypes';
import { parseParameters } from 'api/api';

const initialState = {
    all: [], // TODO: Change to an object map
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

        case actionTypes.JOB_EDIT:
            const field = action.payload.fieldName;

            return {
                ...state,
                dirty: true,
                changes: {
                    ...state.changes,
                    [field]: action.payload.value,
                },
            };

        case actionTypes.CONFIGURATION_LOAD_SUCCESS:
            return {
                ...state,
                configuration: {
                    loaded: true,
                    types: action.payload.configuration.jobTypes,
                    statuses: action.payload.configuration.jobStatuses,
                    parameters: action.payload.configuration.jobParameters,
                },
            };
    }

    return state;
}

export default jobsReducer;