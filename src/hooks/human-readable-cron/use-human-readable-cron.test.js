import { useContext } from 'react'
import useHumanReadableCron from './use-human-readable-cron'

jest.mock('react', () => ({
    useContext: jest.fn(),
    createContext: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('useHumanReadableCron', () => {
    it('should return an empty string when there is no locale', () => {
        useContext.mockImplementationOnce(() => '')

        const cron = '0 0 * ? * *'
        const actual = useHumanReadableCron(cron)

        expect(actual).toBe('')
    })

    it('should return an empty string when cron is invalid', () => {
        useContext.mockImplementationOnce(() => 'en')

        const cron = 'invalid'
        const actual = useHumanReadableCron(cron)

        expect(actual).toBe('')
    })

    it('should return a translated cron if there is a locale', () => {
        useContext.mockImplementationOnce(() => 'fr')

        const cron = '0 0 * ? * *'
        const actual = useHumanReadableCron(cron)

        expect(actual).toEqual(expect.stringMatching('Toutes les heures'))
    })
})
