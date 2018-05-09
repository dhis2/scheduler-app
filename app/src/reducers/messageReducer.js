import * as actions from 'constants/actions';
import i18n from 'locales';
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
                message: i18n.t('Successfully deleted job'),
                type: POSITIVE,
                persist: false,
            };

        case actions.JOB_POST_SUCCESS:
            return {
                id: increment(state.id),
                message: i18n.t('Successfully created job'),
                type: POSITIVE,
                persist: false,
            };

        case actions.JOB_SAVE_SUCCESS:
            return {
                id: increment(state.id),
                message: i18n.t('Successfully updated job'),
                type: POSITIVE,
                persist: false,
            };

        case actions.JOB_POST_ERROR:
            return {
                id: increment(state.id),
                message: `${i18n.t('Could not create job')}: ${getErrorMessage(
                    action.payload.error,
                )}`,
                type: NEGATIVE,
                persist: false,
            };

        case actions.JOB_SAVE_ERROR:
            return {
                id: increment(state.id),
                message: `${i18n.t('Could not update job')}: ${getErrorMessage(
                    action.payload.error,
                )}`,
                type: POSITIVE,
                persist: false,
            };

        case actions.JOB_RUN_ERROR:
            return {
                id: increment(state.id),
                message: `${i18n.t('Could not run job')}: ${getErrorMessage(
                    action.payload.error,
                )}`,
                type: NEGATIVE,
            };

        case actions.NOT_AUTHORIZED:
            return {
                id: increment(state.id),
                message: i18n.t('You are not authorized to use this app'),
                type: NEGATIVE,
                persist: true,
            };

        default:
            return state;
    }
}

export default messageReducer;
