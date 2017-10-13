import * as actionTypes from 'constants/actionTypes';

const initialState = {
    all: [],
    loadingDone: false,
    selected: null,
};

function jobsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.JOBS_LOAD_SUCCESS:
            return {
                ...state,
                all: action.payload.jobs,
                loadingDone: true,
            };

        case actionTypes.JOB_SELECT:
            return {
                ...state,
                selected: action.payload.id,
            };

        case actionTypes.JOB_DELETE_SUCCESS:
            const deletedJobId = action.payload.id;
            return {
                ...state,
                all: state.jobs.filter(job => job.id !== deletedJobId),
            };

        case actionTypes.JOB_DELETE_ERROR:
            return state;
    }

    return state;
}

export default jobsReducer;