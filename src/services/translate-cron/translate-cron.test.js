beforeEach(() => {
    jest.resetModules()
})

/**
 * This uses jest's doMock, since the value we want to mock is a property of the
 * module, and not a function. Jest's doMock seems to be the only mocking strategy
 * that will allow us to mock this. This is also why we're requiring the module
 * after mocking, and not importing it globally
 *
 * https://jestjs.io/docs/en/jest-object#jestdomockmodulename-factory-options
 */

describe('translateCron', () => {
    it('should return an empty string for invalid CRON expressions', () => {
        jest.doMock('@dhis2/d2-i18n', () => ({
            language: 'en',
        }))
        const translateCron = require('./translate-cron').default

        const actual = translateCron('invalid')

        expect(actual).toBe('')
    })

    it('should return a translation in the requested locale for valid CRON expressions', () => {
        jest.doMock('@dhis2/d2-i18n', () => ({
            language: 'fr',
        }))
        const translateCron = require('./translate-cron').default

        const actual = translateCron('0 0 1 ? * *')

        expect(actual).toEqual(expect.stringContaining('À 01:00 AM'))
    })

    it('should fall back to English', () => {
        jest.doMock('@dhis2/d2-i18n', () => ({
            language: undefined,
        }))
        const translateCron = require('./translate-cron').default

        const actual = translateCron('0 0 1 ? * *')

        expect(actual).toEqual(expect.stringContaining('At 01:00 AM'))
    })
})
