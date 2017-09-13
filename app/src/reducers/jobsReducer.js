import * as actionTypes from "../constants/actionTypes";

const initialState = {
    jobs: [],
};

function jobsReducer(state = { ...initialState }, action) {
    switch (action.type) {
        case actionTypes.JOBS_LOAD_SUCCESS:
            return {
                ...state,
                jobs: action.payload,
            };
    }

    return state;
}

export default jobsReducer;