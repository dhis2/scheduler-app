import { useDataEngine } from '@dhis2/app-runtime'
import history from '../../services/history'
import formatError from '../../services/format-error'

const createMutation = (name) => ({
    resource: `scheduler/queues/${name}`,
    type: 'create',
    data: ({ queue }) => queue,
})

const useSubmitJobQueue = () => {
    const engine = useDataEngine()
    const submitJobQueue = (queue) => {
        const mutation = createMutation(queue.name)
        return engine
            .mutate(mutation, { variables: { queue } })
            .then(() => {
                history.push('/')
            })
            .catch((error) => {
                const isValidationError = error.type === 'access'

                // Potential validation error, return it in a format final-form can handle
                if (isValidationError) {
                    return formatError(error)
                }

                // Throw any unexpected errors
                throw error
            })
    }

    return [submitJobQueue]
}

export default useSubmitJobQueue
