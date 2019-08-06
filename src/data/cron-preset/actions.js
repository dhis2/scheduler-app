import * as types from './actionTypes'

export const setPreset = payload => ({
    type: types.SET_PRESET,
    payload,
})

export const clearPreset = () => ({
    type: types.CLEAR_PRESET,
})
