import * as actionTypes from "../constants/actionTypes";

const initialState = {
    jobs: [],
    jobTypes: [],
    jobStatuses: [],
    selected: -1,
};

function jobsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.JOBS_LOAD_SUCCESS:
            return {
                ...state,
                jobs: action.payload.jobs,
            };

        case actionTypes.JOB_SELECT:
            return {
                ...state,
                selected: action.payload.index,
            };

        case actionTypes.CONFIGURATION_LOAD_SUCCESS:
            return {
                ...state,
                jobTypes: action.payload.configuration.jobTypes,
                jobStatuses: action.payload.configuration.jobStatuses,
            };

        case actionTypes.JOB_DELETE_SUCCESS:
            const deletedJobId = action.payload.id;
            return {
                ...state,
                jobs: state.jobs.filter(job => job.id !== deletedJobId),
            };

        case actionTypes.JOB_DELETE_ERROR:
            return state;
    }

    return state;
}

export default jobsReducer;