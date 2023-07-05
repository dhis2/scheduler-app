import { useDataEngine } from '@dhis2/app-runtime'
import history from '../../services/history'
import formatError from '../../services/format-error'
import useSubmitJobQueue from './use-submit-job-queue'

jest.mock('@dhis2/app-runtime', () => ({
    useDataEngine: jest.fn(),
}))

jest.mock('../../services/history', () => ({
    push: jest.fn(),
}))

jest.mock('../../services/format-error', () => jest.fn())

describe('useSubmitJobQueue', () => {
    it('should redirect to root', () => {
        const engine = {
            mutate: () => Promise.resolve(),
        }
        useDataEngine.mockImplementation(() => engine)
        const [submitJobQueue] = useSubmitJobQueue()

        expect.assertions(1)

        submitJobQueue({ name: 'name' }).then(() => {
            expect(history.push).toHaveBeenCalledWith('/')
        })
    })

    it('should resolve with formatted errors on errors', () => {
        const error = new Error('Validation error')

        const engine = {
            mutate: () => Promise.reject(error),
        }
        useDataEngine.mockImplementation(() => engine)
        formatError.mockImplementation((error) => error)

        const [submitJobQueue] = useSubmitJobQueue()

        expect.assertions(1)

        return expect(submitJobQueue({ name: 'name' })).resolves.toBe(error)
    })
})
