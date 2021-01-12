import translateCron from './translate-cron'

jest.mock('@dhis2/d2-i18n', () => ({
    language: 'en',
}))

describe('translateCron', () => {
    it('should return an empty string for invalid CRON expressions', () => {
        const actual = translateCron('invalid')

        expect(actual).toBe('')
    })

    it('should return a translation for valid CRON expressions', () => {
        const actual = translateCron('0 0 1 ? * *')

        expect(actual).toEqual(expect.stringContaining('At 01:00 AM'))
    })
})
