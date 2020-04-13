import { FinalForm } from '@dhis2/ui'
import formatError from './format-error'

const { FORM_ERROR } = FinalForm

describe('formatError', () => {
    it('should format field specific errors', () => {
        const unformatted = {
            details: {
                response: {
                    errorReports: [
                        {
                            errorProperty: 'field',
                            message: 'field error message',
                        },
                    ],
                },
            },
        }
        const actual = formatError(unformatted)
        const expected = {
            field: 'field error message',
        }

        expect(actual).toEqual(expected)
    })

    it('should format generic errors', () => {
        const unformatted = {
            details: {
                response: {
                    errorReports: [
                        {
                            message: 'generic error message',
                        },
                        {
                            message: 'another generic error message',
                        },
                    ],
                },
            },
        }
        const actual = formatError(unformatted)
        const expected = {
            [FORM_ERROR]: [
                'generic error message',
                'another generic error message',
            ],
        }

        expect(actual).toEqual(expected)
    })
})
