import requiredCron from './required-cron'

describe('requiredCron', () => {
    it('should return an error when there is no input', () => {
        const actual = requiredCron([])

        expect(actual).toBeInstanceOf(Error)
        expect(actual.message).toMatchSnapshot()
    })

    it('should return an error when input is not a string', () => {
        const actual = requiredCron([])

        expect(actual).toBeInstanceOf(Error)
        expect(actual.message).toMatchSnapshot()
    })

    it('should return an error when input is not a valid CRON expression', () => {
        const actual = requiredCron('abc')

        expect(actual).toBeInstanceOf(Error)
        expect(actual.message).toMatchSnapshot()
    })

    it('should return undefined when input is a valid CRON expression', () => {
        const actual = requiredCron('* * * ? * *')

        expect(actual).toBeUndefined()
    })
})
