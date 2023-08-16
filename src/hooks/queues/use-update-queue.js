import { useDataEngine } from '@dhis2/app-runtime'
import formatError from '../../services/format-error'

const createMutation = (name) => ({
    resource: `scheduler/queues/${name}`,
    type: 'update',
    data: ({ queue }) => queue,
})

const useUpdateQueue = ({ onSuccess, initialName } = {}) => {
    const engine = useDataEngine()
    const updateQueue = (queue) => {
        const mutation = createMutation(initialName)
        return engine
            .mutate(mutation, { variables: { queue } })
            .then(() => {
                if (onSuccess) {
                    onSuccess()
                }
            })
            .catch((error) => formatError(error))
    }

    return [updateQueue]
}

export default useUpdateQueue
