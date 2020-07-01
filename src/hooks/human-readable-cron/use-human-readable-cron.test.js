import { useDataQuery } from '@dhis2/app-runtime'
import { getLocale } from './selectors'
import useHumanReadableCron from './use-human-readable-cron'

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

jest.mock('./selectors', () => ({
    getLocale: jest.fn(),
}))

describe('useHumanReadableCron', () => {
    it('should return an empty string when loading', () => {
        useDataQuery.mockImplementationOnce(() => ({
            loading: true,
            error: undefined,
            data: null,
        }))

        const cron = '0 0 * ? * *'
        const actual = useHumanReadableCron(cron)

        expect(actual).toBe('')
    })

    it('should return an empty string when invalid', () => {
        useDataQuery.mockImplementationOnce(() => ({
            loading: false,
            error: undefined,
            data: null,
        }))

        const cron = 'invalid'
        const actual = useHumanReadableCron(cron)

        expect(actual).toBe('')
    })

    it('should return an english translation if there is an error', () => {
        useDataQuery.mockImplementationOnce(() => ({
            loading: false,
            error: new Error(''),
            data: null,
        }))

        const cron = '0 0 * ? * *'
        const actual = useHumanReadableCron(cron)

        expect(actual).toBe('Every hour')
    })

    it('should return a translated cron if there is a locale', () => {
        useDataQuery.mockImplementationOnce(() => ({
            loading: false,
            error: undefined,
            data: {},
        }))
        getLocale.mockImplementationOnce(() => 'fr')

        const cron = '0 0 * ? * *'
        const actual = useHumanReadableCron(cron)

        expect(actual).toBe('Toutes les heures')
    })
})
