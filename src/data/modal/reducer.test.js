import * as types from './actionTypes'
import reducer, * as selectors from './reducer'

describe('reducer', () => {
    const initialState = {
        modalType: null,
        modalProps: {},
    }

    it('should return the initial state', () => {
        const actual = reducer(undefined, {})
        const expected = initialState

        expect(actual).toEqual(expected)
    })

    it('should handle SHOW_MODAL', () => {
        const payload = {
            modalType: 'TYPE',
            modalProps: {
                prop: 'prop',
            },
        }
        const actual = reducer(undefined, { type: types.SHOW_MODAL, payload })
        const expected = { ...payload }

        expect(actual).toEqual(expected)
    })

    it('should handle HIDE_MODAL', () => {
        const activeState = {
            modalType: 'TYPE',
            modalProps: {
                prop: 'prop',
            },
        }
        const actual = reducer(activeState, { type: types.HIDE_MODAL })
        const expected = initialState

        expect(actual).toEqual(expected)
    })
})

describe('getType', () => {
    it('should return modal type', () => {
        const state = {
            modalType: 'TYPE',
        }
        const expected = state.modalType
        const actual = selectors.getType(state)

        expect(actual).toEqual(expected)
    })
})

describe('getProps', () => {
    it('should return modal props', () => {
        const state = {
            modalProps: {
                prop: 'prop',
            },
        }
        const expected = state.modalProps
        const actual = selectors.getProps(state)

        expect(actual).toEqual(expected)
    })
})
