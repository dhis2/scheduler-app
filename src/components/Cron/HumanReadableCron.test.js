import { useContext } from 'react'
import HumanReadableCron from './HumanReadableCron'

jest.mock('react', () => ({
    useContext: jest.fn(),
    createContext: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<HumanReadableCron>', () => {
    it('returns a human readable cron', () => {
        useContext.mockImplementation(() => 'en')

        const cronExpression = '0 0 1 ? * *'
        const humanReadableCron = 'At 01:00 AM'

        expect(HumanReadableCron({ cronExpression })).toBe(humanReadableCron)
    })
})
