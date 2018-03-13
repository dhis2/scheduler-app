import * as actions from 'constants/actions';

export const initialState = {
    update: false,
    delete: false,
};

function pendingReducer(state = initialState, action) {
    switch (action.type) {
        case actions.JOB_POST:
        case actions.JOB_SAVE: {
            return {
                ...state,
                update: true,
            };
        }

        case actions.JOB_POST_SUCCESS:
        case actions.JOB_POST_ERROR:
        case actions.JOB_SAVE_SUCCESS:
        case actions.JOB_SAVE_ERROR: {
            return {
                ...state,
                update: false,
            };
        }

        case actions.JOB_DELETE: {
            return {
                ...state,
                delete: true,
            };
        }

        case actions.JOB_DELETE_SUCCESS:
        case actions.JOB_DELETE_ERROR: {
            return {
                ...state,
                delete: false,
            };
        }

        default:
            return state;
    }
}

export default pendingReducer;
