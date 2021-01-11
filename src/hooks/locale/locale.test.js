import { useDataQuery } from '@dhis2/app-runtime'
import useLocale from './locale'

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('useLocale', () => {
    it('should return an empty string when loading', () => {
        useDataQuery.mockImplementation(() => ({
            loading: true,
            error: undefined,
            data: null,
        }))

        const actual = useLocale()

        expect(actual).toBe('')
    })

    it('should return the fallback if there is an error', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: new Error(''),
            data: null,
        }))

        const actual = useLocale()

        expect(actual).toEqual(expect.stringMatching('en'))
    })

    it('should return the locale if it is available in the response', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {
                userSettings: {
                    keyUiLocale: 'fr',
                },
            },
        }))

        const actual = useLocale()

        expect(actual).toEqual(expect.stringMatching('fr'))
    })

    it('should return the fallback if it is unavailable in the response', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {
                userSettings: {},
            },
        }))

        const actual = useLocale()

        expect(actual).toEqual(expect.stringMatching('en'))
    })
})
