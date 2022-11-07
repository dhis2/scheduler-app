import validateCron from './validate-cron'

describe('validateCron', () => {
    it('should not allow an empty string', () => {
        expect(validateCron('')).toBe(false)
    })

    it('should allow a question mark for day-of-month', () => {
        expect(validateCron('* * * ? * *')).toBe(true)
    })

    it('should allow question mark for the day-of-week', () => {
        expect(validateCron('* * * * * ?')).toBe(true)
    })

    it('should disallow question mark in invalid locations', () => {
        expect(validateCron('? * * * * *')).toBe(false)
        expect(validateCron('* ? * * * *')).toBe(false)
        expect(validateCron('* * ? * * *')).toBe(false)
        expect(validateCron('* * * * ? *')).toBe(false)
    })

    it('should allow strings for day-of-week', () => {
        expect(validateCron('* * * * * MON')).toBe(true)
    })

    it('should allow string ranges for day-of-week', () => {
        expect(validateCron('* * * * * MON-FRI')).toBe(true)
    })

    it('should allow for valid fractions', () => {
        expect(validateCron('0 0 */3 * * *')).toBe(true)
    })

    it('should allow for number ranges', () => {
        expect(validateCron('0 0 1-5 * * *')).toBe(true)
    })

    it('should allow ranges in fraction numerators', () => {
        expect(validateCron('0 0 10-22/2 ? * *')).toBe(true)
    })
})
