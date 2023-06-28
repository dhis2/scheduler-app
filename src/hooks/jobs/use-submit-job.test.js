import { useDataEngine } from '@dhis2/app-runtime'
import formatError from '../../services/format-error'
import useSubmitJob from './use-submit-job'

jest.mock('@dhis2/app-runtime', () => ({
    useDataEngine: jest.fn(),
}))

jest.mock('../../services/format-error', () => jest.fn())

describe('useSubmitJob', () => {
    it('should call onSuccess on success', () => {
        const spy = jest.fn()
        const engine = {
            mutate: () => Promise.resolve(),
        }
        useDataEngine.mockImplementation(() => engine)
        const [submitJob] = useSubmitJob({ onSuccess: spy })

        expect.assertions(1)

        submitJob().then(() => {
            expect(spy).toHaveBeenCalled()
        })
    })

    it('should resolve with errors on validation errors', () => {
        // Validation errors are detected by type
        const error = new Error('Validation error')
        error.type = 'access'

        const engine = {
            mutate: () => Promise.reject(error),
        }
        useDataEngine.mockImplementation(() => engine)
        formatError.mockImplementation((error) => error)

        const [submitJob] = useSubmitJob()

        expect.assertions(1)

        return expect(submitJob()).resolves.toBe(error)
    })

    it('should reject with an error on any other errors', () => {
        const error = new Error('Network error')

        const engine = {
            mutate: () => Promise.reject(error),
        }
        useDataEngine.mockImplementation(() => engine)

        const [submitJob] = useSubmitJob()

        expect.assertions(1)

        return expect(submitJob()).rejects.toBe(error)
    })
})
