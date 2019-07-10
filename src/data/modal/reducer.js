import * as types from './actionTypes'

const initialState = {
    type: null,
    props: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_MODAL:
            return {
                type: action.payload.type,
                props: action.payload.props,
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

export const getType = state => state.type
export const getProps = state => state.props
