import * as actionTypes from "../constants/actionTypes";

const initialState = {
    jobs: [],
    selected: -1,
};

function jobsReducer(state = { ...initialState }, action) {
    switch (action.type) {
        case actionTypes.JOBS_LOAD_SUCCESS:
            return {
                ...state,
                jobs: action.payload,
            };

        case actionTypes.JOB_SELECT:
            return {
                ...state,
                selected: action.payload,
            };
    }

    return state;
}

export default jobsReducer;