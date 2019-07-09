import * as types from './actionTypes'

const initialState = {
    modalType: null,
    modalProps: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_MODAL:
            return {
                modalType: action.payload.modalType,
                modalProps: action.payload.modalProps,
            }
        case types.HIDE_MODAL:
            return initialState
        default:
            return state
    }
}

export default reducer

/**
 * Selectors
 */

export const getType = state => state.modalType
export const getProps = state => state.modalProps
