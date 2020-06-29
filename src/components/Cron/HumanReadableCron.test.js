import { useHumanReadableCron } from '../../hooks/human-readable-cron'
import HumanReadableCron from './HumanReadableCron'

jest.mock('../../hooks/human-readable-cron', () => ({
    useHumanReadableCron: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<HumanReadableCron>', () => {
    it('returns a human readable cron', () => {
        const cronExpression = '0 0 1 ? * *'
        const humanReadableCron = 'Every day'

        useHumanReadableCron.mockImplementation(() => humanReadableCron)

        expect(HumanReadableCron({ cronExpression })).toBe(humanReadableCron)
    })
})
