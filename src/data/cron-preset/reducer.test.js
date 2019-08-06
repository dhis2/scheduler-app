import * as types from './actionTypes'
import reducer, * as selectors from './reducer'

describe('reducer', () => {
    const initialState = {
        preset: '',
    }

    it('should return the initial state', () => {
        const actual = reducer(undefined, {})
        const expected = initialState

        expect(actual).toEqual(expected)
    })

    it('should handle SET_PRESET', () => {
        const payload = 'CRON'
        const actual = reducer(undefined, { type: types.SET_PRESET, payload })
        const expected = {
            preset: payload,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle CLEAR_PRESET', () => {
        const activeState = { preset: 'CRON' }
        const actual = reducer(activeState, { type: types.CLEAR_PRESET })
        const expected = initialState

        expect(actual).toEqual(expected)
    })
})

describe('getPreset', () => {
    it('should return the preset', () => {
        const state = {
            preset: 'CRON',
        }
        const expected = state.preset
        const actual = selectors.getPreset(state)

        expect(actual).toEqual(expected)
    })
})
