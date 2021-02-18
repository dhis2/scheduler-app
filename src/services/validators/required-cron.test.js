import requiredCron from './required-cron'

describe('requiredCron', () => {
    it('should return an error message when there is no input', () => {
        const expected = 'A CRON expression is required'
        const actual = requiredCron([])

        expect(actual).toEqual(expect.stringMatching(expected))
    })

    it('should return an error message when input is not a string', () => {
        const expected = 'A CRON expression is required'
        const actual = requiredCron([])

        expect(actual).toEqual(expect.stringMatching(expected))
    })

    it('should return an error message when input is not a valid CRON expression', () => {
        const expected = 'Please enter a valid CRON expression'
        const actual = requiredCron('abc')

        expect(actual).toEqual(expect.stringMatching(expected))
    })

    it('should return undefined when input is a valid CRON expression', () => {
        const actual = requiredCron('* * * ? * *')

        expect(actual).toBeUndefined()
    })
})
