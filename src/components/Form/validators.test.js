import * as validators from './validators'

describe('requiredCronExpression', () => {
    it('should return an error when there is no input', () => {
        const actual = validators.requiredCronExpression([])

        expect(actual).toBeInstanceOf(Error)
        expect(actual.message).toMatchSnapshot()
    })

    it('should return an error when input is not a string', () => {
        const actual = validators.requiredCronExpression([])

        expect(actual).toBeInstanceOf(Error)
        expect(actual.message).toMatchSnapshot()
    })

    it('should return an error when input is not a valid CRON expression', () => {
        const actual = validators.requiredCronExpression('abc')

        expect(actual).toBeInstanceOf(Error)
        expect(actual.message).toMatchSnapshot()
    })

    it('should return undefined when input is a valid CRON expression', () => {
        const actual = validators.requiredCronExpression('* * * ? * *')

        expect(actual).toBeUndefined()
    })
})

describe('requiredString', () => {
    it('should return an error when there is no input', () => {
        const actual = validators.requiredString([])

        expect(actual).toBeInstanceOf(Error)
        expect(actual.message).toMatchSnapshot()
    })

    it('should return an error when input is not a string', () => {
        const actual = validators.requiredString([])

        expect(actual).toBeInstanceOf(Error)
        expect(actual.message).toMatchSnapshot()
    })

    it('should return undefined when input is at least a single character', () => {
        const actual = validators.requiredString('a')

        expect(actual).toBeUndefined()
    })
})
