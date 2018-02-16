import * as actions from 'constants/actions';
import i18next from 'i18next';
import getErrorMessage from 'utils/getErrorMessage';

const NEUTRAL = 'NEUTRAL';
const POSITIVE = 'POSITIVE';
const NEGATIVE = 'NEGATIVE';

export const initialState = {
    id: -1,
    persist: false,
    message: '',
    type: NEUTRAL,
};

const increment = number => number + 1;

function messageReducer(state = initialState, action) {
    switch (action.type) {
        case actions.JOB_DELETE_SUCCESS:
            return {
                id: increment(state.id),
                message: i18next.t('successfully_deleted_job'),
                type: POSITIVE,
                persist: false,
            };

        case actions.JOB_POST_SUCCESS:
            return {
                id: increment(state.id),
                message: i18next.t('successfully_created_job'),
                type: POSITIVE,
                persist: false,
            };

        case actions.JOB_SAVE_SUCCESS:
            return {
                id: increment(state.id),
                message: i18next.t('successfully_updated_job'),
                type: POSITIVE,
                persist: false,
            };

        case actions.JOB_POST_ERROR:
            return {
                id: increment(state.id),
                message: `${i18next.t('could_not_create_job')}: ${getErrorMessage(
                    action.payload.error,
                )}`,
                type: NEGATIVE,
                persist: false,
            };

        case actions.JOB_SAVE_ERROR:
            return {
                id: increment(state.id),
                message: `${i18next.t('could_not_update_job')}: ${getErrorMessage(
                    action.payload.error,
                )}`,
                type: POSITIVE,
                persist: false,
            };

        case actions.JOB_RUN_ERROR:
            return {
                id: increment(state.id),
                message: `${i18next.t('could_not_run_job')}: ${getErrorMessage(
                    action.payload.error,
                )}`,
                type: NEGATIVE,
            };

        case actions.NOT_AUTHORIZED:
            return {
                id: increment(state.id),
                message: i18next.t('not_authorized_message'),
                type: NEGATIVE,
                persist: true,
            };

        default:
            return state;
    }
}

export default messageReducer;
