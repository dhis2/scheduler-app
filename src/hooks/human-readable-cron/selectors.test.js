import { getLocale } from './selectors'

describe('getLocale', () => {
    it('should return empty string if there is no keyUiLocale', () => {
        expect(getLocale({})).toBe('')
    })

    it('should return the keyUiLocale if it is in the data', () => {
        const keyUiLocale = 'en'

        expect(getLocale({ keyUiLocale })).toEqual(
            expect.stringMatching(keyUiLocale)
        )
    })
})
