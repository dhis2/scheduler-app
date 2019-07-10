import * as types from './actionTypes'
import reducer, * as selectors from './reducer'

describe('reducer', () => {
    const initialState = {
        type: null,
        props: {},
    }

    it('should return the initial state', () => {
        const actual = reducer(undefined, {})
        const expected = initialState

        expect(actual).toEqual(expected)
    })

    it('should handle SHOW_MODAL', () => {
        const payload = {
            type: 'TYPE',
            props: {
                prop: 'prop',
            },
        }
        const actual = reducer(undefined, { type: types.SHOW_MODAL, payload })
        const expected = { ...payload }

        expect(actual).toEqual(expected)
    })

    it('should handle HIDE_MODAL', () => {
        const activeState = {
            type: 'TYPE',
            props: {
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
            type: 'TYPE',
        }
        const expected = state.type
        const actual = selectors.getType(state)

        expect(actual).toEqual(expected)
    })
})

describe('getProps', () => {
    it('should return modal props', () => {
        const state = {
            props: {
                prop: 'prop',
            },
        }
        const expected = state.props
        const actual = selectors.getProps(state)

        expect(actual).toEqual(expected)
    })
})
