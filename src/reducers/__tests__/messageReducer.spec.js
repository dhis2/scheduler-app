import reducer, { initialState } from 'reducers/messageReducer';
import * as actions from 'constants/actions';

describe('messageReducer', () => {
    it('should return the initial state', () => {
        const expectedState = { ...initialState };

        const actualState = reducer(undefined, {});
        expect(actualState).toEqual(expectedState);
    });

    it('should handle positive messages', () => {
        const action = {
            type: actions.JOB_DELETE_SUCCESS,
        };

        const expectedState = {
            id: 0,
            message: 'successfully_deleted_job_translated',
            type: 'POSITIVE',
            persist: false,
        };

        const actualState = reducer(initialState, action);
        expect(actualState).toEqual(expectedState);
    });

    describe('should handle errors', () => {
        const message =
            'Could not create job because of some obscure bug in the Scheduler back-end';
        const expectedState = {
            id: 0,
            message: `could_not_create_job_translated: ${message}`,
            type: 'NEGATIVE',
            persist: false,
        };

        it('should handle messages with an error message', () => {
            const action = {
                type: actions.JOB_POST_ERROR,
                payload: { error: { message } },
            };

            const actualState = reducer(initialState, action);
            expect(actualState).toEqual(expectedState);
        });

        it('should handle messages with an error report', () => {
            const action = {
                type: actions.JOB_POST_ERROR,
                payload: {
                    error: {
                        response: {
                            errorReports: [{ message }],
                        },
                    },
                },
            };

            const actualState = reducer(initialState, action);
            expect(actualState).toEqual(expectedState);
        });
    });

    it('should handle NOT_AUTHORIZED', () => {
        const action = {
            type: actions.NOT_AUTHORIZED,
        };

        const expectedState = {
            id: 0,
            message: 'not_authorized_message_translated',
            type: 'NEGATIVE',
            persist: true,
        };

        const actualState = reducer(initialState, action);
        expect(actualState).toEqual(expectedState);
    });
});
