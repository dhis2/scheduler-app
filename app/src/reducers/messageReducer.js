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

const getErrorMessage = (error) => {
    if (error.response.errorReports && error.response.errorReports.length > 0) {
        return error.response.errorReports[0].message;
    } else return error.message;
}

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
        
        case actionTypes.JOB_SAVE_SUCCESS:
            return {
                message: 'Successfully updated job',
                type: POSITIVE,
                time: moment().format('HH:mm:ss'),
            };

        case actionTypes.JOB_POST_ERROR:
            return {
                message: `Could not create job: ${getErrorMessage(action.payload.error)}`,
                type: NEGATIVE,
                time: moment().format('HH:mm:ss'),
            };

        case actionTypes.JOB_SAVE_ERROR:
            return {
                message: `Could not update job: ${getErrorMessage(action.payload.error)}`,
                type: POSITIVE,
                time: moment().format('HH:mm:ss'),
            };
    }

    return state;
}

export default messageReducer;