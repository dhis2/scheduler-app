import requiredString from './required-string'

describe('requiredString', () => {
    it('should return an error when there is no input', () => {
        const actual = requiredString([])

        expect(actual).toBeInstanceOf(Error)
        expect(actual.message).toMatchSnapshot()
    })

    it('should return an error when input is not a string', () => {
        const actual = requiredString([])

        expect(actual).toBeInstanceOf(Error)
        expect(actual.message).toMatchSnapshot()
    })

    it('should return undefined when input is at least a single character', () => {
        const actual = requiredString('a')

        expect(actual).toBeUndefined()
    })
})
