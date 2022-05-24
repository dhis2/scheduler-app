import { useContext } from 'react'
import { useDataEngine } from '@dhis2/app-runtime'
import history from '../../services/history'
import formatError from '../../services/format-error'
import useUpdateJob from './use-update-job'

jest.mock('@dhis2/app-runtime', () => ({
    useDataEngine: jest.fn(),
}))

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn(() => ({ refetchJobs: () => {} })),
}))

jest.mock('../../services/history', () => ({
    push: jest.fn(),
}))

jest.mock('../../services/format-error', () => jest.fn())

describe('useUpdateJob', () => {
    it('should redirect to root and refetch after a successful update', () => {
        const refetchspy = jest.fn()
        const engine = {
            mutate: () => Promise.resolve(),
        }
        useContext.mockImplementation(() => ({ refetchJobs: refetchspy }))
        useDataEngine.mockImplementation(() => engine)
        const [updateJob] = useUpdateJob({ id: 'id' })

        expect.assertions(2)

        return updateJob().then(() => {
            expect(history.push).toHaveBeenCalledWith('/')
            expect(refetchspy).toHaveBeenCalled()
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

        const [updateJob] = useUpdateJob({ id: 'id' })

        expect.assertions(1)

        return expect(updateJob()).resolves.toBe(error)
    })

    it('should reject with an error on any other errors', () => {
        const error = new Error('Network error')

        const engine = {
            mutate: () => Promise.reject(error),
        }
        useDataEngine.mockImplementation(() => engine)

        const [updateJob] = useUpdateJob({ id: 'id' })

        expect.assertions(1)

        return expect(updateJob()).rejects.toBe(error)
    })
})
