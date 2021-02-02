import { formatToString } from './formatters'

describe('formatToString', () => {
    it('returns numbers as a string', () => {
        const number = 1
        const expected = '1'
        const actual = formatToString(number)

        expect(actual).toBe(expected)
    })

    it('returns values that are not numbers as is', () => {
        const str = '1'
        const arr = []
        const obj = {}

        expect(formatToString(str)).toBe(str)
        expect(formatToString(arr)).toBe(arr)
        expect(formatToString(obj)).toBe(obj)
    })
})
