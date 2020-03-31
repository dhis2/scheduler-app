import { useDataQuery } from '@dhis2/app-runtime'
import useGetMe, { getAuthorized } from './use-get-me'

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

describe('useGetMe', () => {
    it('should return the expected data', () => {
        const response = {
            loading: false,
            error: undefined,
            data: undefined,
            refetch: () => {},
        }
        useDataQuery.mockImplementationOnce(() => response)
        const expected = {
            loading: response.loading,
            error: response.error,
            data: undefined,
            refetch: response.refetch,
        }

        expect(useGetMe()).toEqual(expected)
    })

    it('should return me if present in the response data', () => {
        const response = {
            loading: false,
            error: undefined,
            data: { me: {} },
            refetch: () => {},
        }
        useDataQuery.mockImplementationOnce(() => response)
        const expected = {
            loading: response.loading,
            error: response.error,
            data: response.data.me,
            refetch: response.refetch,
        }

        expect(useGetMe()).toEqual(expected)
    })
})

describe('getAuthorized', () => {
    it('should return false if there are no authorities', () => {
        expect(getAuthorized({})).toBe(false)
    })

    it('should return true if the authorities include ALL', () => {
        const me = {
            authorities: ['ALL'],
        }

        expect(getAuthorized(me)).toBe(true)
    })

    it('should return true if the authorities include F_SCHEDULING_ADMIN', () => {
        const me = {
            authorities: ['F_SCHEDULING_ADMIN'],
        }

        expect(getAuthorized(me)).toBe(true)
    })
})
