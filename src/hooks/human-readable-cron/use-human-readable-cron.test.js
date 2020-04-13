import { useGetUserSettings, selectors } from '../user-settings'
import useHumanReadableCron from './use-human-readable-cron'

jest.mock('../user-settings', () => ({
    useGetUserSettings: jest.fn(),
    selectors: {
        getLocale: jest.fn(),
    },
}))

describe('useHumanReadableCron', () => {
    it('should return an empty string when loading', () => {
        useGetUserSettings.mockImplementationOnce(() => ({
            loading: true,
            error: undefined,
            data: null,
        }))

        const cron = '0 0 * ? * *'
        const actual = useHumanReadableCron(cron)

        expect(actual).toBe('')
    })

    it('should return an empty string when invalid', () => {
        useGetUserSettings.mockImplementationOnce(() => ({
            loading: false,
            error: undefined,
            data: null,
        }))

        const cron = 'invalid'
        const actual = useHumanReadableCron(cron)

        expect(actual).toBe('')
    })

    it('should return an english translation if there is an error', () => {
        useGetUserSettings.mockImplementationOnce(() => ({
            loading: false,
            error: new Error(''),
            data: null,
        }))

        const cron = '0 0 * ? * *'
        const actual = useHumanReadableCron(cron)

        expect(actual).toBe('Every hour')
    })

    it('should return a translated cron if there is a locale', () => {
        useGetUserSettings.mockImplementationOnce(() => ({
            loading: false,
            error: undefined,
            data: {},
        }))
        selectors.getLocale.mockImplementationOnce(() => 'fr')

        const cron = '0 0 * ? * *'
        const actual = useHumanReadableCron(cron)

        expect(actual).toBe('Toutes les heures')
    })
})
