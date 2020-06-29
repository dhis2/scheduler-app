import validateCron from './validate-cron'

describe('validateCron', () => {
    it('should not allow an empty string', () => {
        expect(validateCron('')).toEqual(false)
    })

    it('should allow a question mark for day-of-month', () => {
        expect(validateCron('* * * ? * *')).toEqual(true)
    })

    it('should allow question mark for the day-of-week', () => {
        expect(validateCron('* * * * * ?')).toEqual(true)
    })

    it('should disallow question mark in invalid locations', () => {
        expect(validateCron('? * * * * *')).toEqual(false)
        expect(validateCron('* ? * * * *')).toEqual(false)
        expect(validateCron('* * ? * * *')).toEqual(false)
        expect(validateCron('* * * * ? *')).toEqual(false)
    })

    it('should allow strings for day-of-week', () => {
        expect(validateCron('* * * * * MON')).toEqual(true)
    })

    it('should allow string ranges for day-of-week', () => {
        expect(validateCron('* * * * * MON-FRI')).toEqual(true)
    })

    it('should allow for valid fractions', () => {
        expect(validateCron('0 0 */3 * * *')).toEqual(true)
    })

    it('should allow for number ranges', () => {
        expect(validateCron('0 0 1-5 * * *')).toEqual(true)
    })
})
