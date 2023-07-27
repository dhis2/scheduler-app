import { useDataEngine } from '@dhis2/app-runtime'
import formatError from '../../services/format-error'

const createMutation = (name) => ({
    resource: `scheduler/queues/${name}`,
    type: 'update',
    data: ({ queue }) => queue,
})

const useUpdateJobQueue = ({ onSuccess } = {}) => {
    const engine = useDataEngine()
    const updateJobQueue = (queue) => {
        const mutation = createMutation(queue.name)
        return engine
            .mutate(mutation, { variables: { queue } })
            .then(() => {
                if (onSuccess) {
                    onSuccess()
                }
            })
            .catch((error) => formatError(error))
    }

    return [updateJobQueue]
}

export default useUpdateJobQueue
