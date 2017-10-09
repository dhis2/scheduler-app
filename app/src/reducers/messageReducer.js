import * as actionTypes from "../constants/actionTypes";

const NEUTRAL = 0;
const POSITIVE = 1;
const NEGATIVE = 2;

const initialState = {
    message: '',
    type: NEUTRAL,
};

function messageReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.JOB_DELETE_SUCCESS:
            return {
                message: `Successfully deleted job`,
                type: POSITIVE,
            };
    }

    return state;
}

export default messageReducer;