import { useDataEngine } from '@dhis2/app-runtime'
import formatError from '../../services/format-error'
import useUpdateQueue from './use-update-queue'

jest.mock('@dhis2/app-runtime', () => ({
    useDataEngine: jest.fn(),
}))

jest.mock('../../services/format-error', () => jest.fn())

describe('useUpdateQueue', () => {
    it('should call onSuccess on success', () => {
        const spy = jest.fn()
        const engine = {
            mutate: () => Promise.resolve(),
        }
        useDataEngine.mockImplementation(() => engine)
        const [submitQueue] = useUpdateQueue({ onSuccess: spy })

        expect.assertions(1)

        submitQueue({ name: 'name' }).then(() => {
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

        const [submitQueue] = useUpdateQueue()

        expect.assertions(1)

        return expect(submitQueue({ name: 'name' })).resolves.toBe(error)
    })
})
