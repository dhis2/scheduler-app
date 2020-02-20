import requiredSingleSelectOption from './required-single-select-option'

describe('requiredSingleSelectOption', () => {
    it('should return an error message when there is no input', () => {
        const actual = requiredSingleSelectOption()

        expect(actual).toMatchSnapshot()
    })

    it('should return an error message when input is not an object', () => {
        const actual = requiredSingleSelectOption('not an object')

        expect(actual).toMatchSnapshot()
    })

    it('should return an error message when input has no props', () => {
        const actual = requiredSingleSelectOption({})

        expect(actual).toMatchSnapshot()
    })

    it('should return an error message when input has no value prop', () => {
        const actual = requiredSingleSelectOption({ label: 'label' })

        expect(actual).toMatchSnapshot()
    })

    it('should return an error message when input has no label prop', () => {
        const actual = requiredSingleSelectOption({ value: 'value' })

        expect(actual).toMatchSnapshot()
    })

    it('should return undefined when input is an object with value and label', () => {
        const actual = requiredSingleSelectOption({ value: 1, label: 2 })

        expect(actual).toBeUndefined()
    })
})
