import * as actionTypes from "constants/actionTypes";
import moment from 'moment';

const NEUTRAL = 'NEUTRAL';
const POSITIVE = 'POSITIVE';
const NEGATIVE = 'NEGATIVE';

const initialState = {
    message: '',
    type: NEUTRAL,
    time: null,
};

function messageReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.JOB_DELETE_SUCCESS:
            return {
                message: 'Successfully deleted job',
                type: POSITIVE,
                time: moment().format('HH:mm:ss'),
            };

        case actionTypes.JOB_POST_SUCCESS:
            return {
                message: 'Successfully created job',
                type: POSITIVE,
                time: moment().format('HH:mm:ss'),
            };

        case actionTypes.JOB_POST_ERROR:
            return {
                message: 'Could not create job',
                type: NEGATIVE,
                time: moment().format('HH:mm:ss'),
            };
    }

    return state;
}

export default messageReducer;