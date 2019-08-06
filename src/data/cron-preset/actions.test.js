import * as types from './actionTypes'
import * as actions from './actions'

describe('setPreset', () => {
    it('should create a SET_PRESET action', () => {
        const payload = 'CRON'
        const actual = actions.setPreset(payload)
        const expected = {
            type: types.SET_PRESET,
            payload,
        }

        expect(actual).toEqual(expected)
    })
})

describe('clearPreset', () => {
    it('should create a CLEAR_PRESET action', () => {
        const actual = actions.clearPreset()
        const expected = {
            type: types.CLEAR_PRESET,
        }

        expect(actual).toEqual(expected)
    })
})
