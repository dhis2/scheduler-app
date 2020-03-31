import { getLocale } from './use-get-user-settings'

describe('getLocale', () => {
    it('should return empty string if there is no keyUiLocale', () => {
        expect(getLocale({})).toBe('')
    })

    it('should return the keyUiLocale if it is in the data', () => {
        const keyUiLocale = 'en'

        expect(getLocale({ keyUiLocale })).toBe('en')
    })
})
