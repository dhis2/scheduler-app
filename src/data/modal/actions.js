import * as types from './actionTypes'

export const showModal = payload => ({
    type: types.SHOW_MODAL,
    payload,
})

export const hideModal = () => ({
    type: types.HIDE_MODAL,
})
