import { useDataEngine } from '@dhis2/app-runtime'
import formatError from '../../services/format-error'
import useUpdateJob from './use-update-job'

jest.mock('@dhis2/app-runtime', () => ({
    useDataEngine: jest.fn(),
}))

jest.mock('../../services/format-error', () => jest.fn())

describe('useUpdateJob', () => {
    it('should call onSuccess on success', () => {
        const spy = jest.fn()
        const engine = {
            mutate: () => Promise.resolve(),
        }
        useDataEngine.mockImplementation(() => engine)
        const [updateJob] = useUpdateJob({ id: 'id', onSuccess: spy })

        expect.assertions(1)

        return updateJob().then(() => {
            expect(spy).toHaveBeenCalled()
        })
    })

    it('should resolve with formatted errors on errors', () => {
        const error = new Error('Validation error')

        const engine = {
            mutate: () => Promise.reject(error),
        }
        useDataEngine.mockImplementation(() => engine)
        formatError.mockImplementation((error) => error)

        const [updateJob] = useUpdateJob({ id: 'id' })

        expect.assertions(1)

        return expect(updateJob()).resolves.toBe(error)
    })
})
