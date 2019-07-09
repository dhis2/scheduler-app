import * as types from './actionTypes'
import * as actions from './actions'

describe('showModal', () => {
    it('should create a SHOW_MODAL action', () => {
        const payload = {
            modalType: 'TYPE',
            modalProps: {
                prop: 'prop',
            },
        }
        const actual = actions.showModal(payload)
        const expected = {
            type: types.SHOW_MODAL,
            payload,
        }

        expect(actual).toEqual(expected)
    })
})

describe('hideModal', () => {
    it('should create a HIDE_MODAL action', () => {
        const actual = actions.hideModal()
        const expected = {
            type: types.HIDE_MODAL,
        }

        expect(actual).toEqual(expected)
    })
})
