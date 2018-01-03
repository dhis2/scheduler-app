import * as actionTypes from 'constants/actionTypes';
import moment from 'moment';
import i18next from 'i18next';

const NEUTRAL = 'NEUTRAL';
const POSITIVE = 'POSITIVE';
const NEGATIVE = 'NEGATIVE';

const initialState = {
    message: '',
    type: NEUTRAL,
    persist: false,
    time: null,
};

const getErrorMessage = error => {
    if (error.response && error.response.errorReports && error.response.errorReports.length > 0) {
        return error.response.errorReports[0].message;
    }

    return error.message;
};

function messageReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.JOB_DELETE_SUCCESS:
            return {
                message: i18next.t('successfully_deleted_job'),
                type: POSITIVE,
                time: moment().format('HH:mm:ss'),
            };

        case actionTypes.JOB_POST_SUCCESS:
            return {
                message: i18next.t('successfully_created_job'),
                type: POSITIVE,
                time: moment().format('HH:mm:ss'),
            };

        case actionTypes.JOB_SAVE_SUCCESS:
            return {
                message: i18next.t('successfully_updated_job'),
                type: POSITIVE,
                time: moment().format('HH:mm:ss'),
            };

        case actionTypes.JOB_POST_ERROR:
            return {
                message: `${i18next.t('could_not_create_job')}: ${getErrorMessage(
                    action.payload.error,
                )}`,
                type: NEGATIVE,
                time: moment().format('HH:mm:ss'),
            };

        case actionTypes.JOB_SAVE_ERROR:
            return {
                message: `${i18next.t('could_not_update_job')}: ${getErrorMessage(
                    action.payload.error,
                )}`,
                type: POSITIVE,
                time: moment().format('HH:mm:ss'),
            };

        case actionTypes.NOT_AUTHORIZED:
            return {
                message: i18next.t('not_authorized_message'),
                type: NEGATIVE,
                time: moment().format('HH:mm:ss'),
                persist: true,
            };

        default:
            return state;
    }
}

export default messageReducer;
