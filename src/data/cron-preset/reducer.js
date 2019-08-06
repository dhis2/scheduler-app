import * as types from './actionTypes'

const initialState = {
    preset: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_PRESET:
            return {
                preset: action.payload,
            }
        case types.CLEAR_PRESET:
            return initialState
        default:
            return state
    }
}

export default reducer

/**
 * Selectors
 */

export const getPreset = state => state.preset
