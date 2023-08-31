import { useDataEngine } from '@dhis2/app-runtime'
import formatError from '../../services/format-error'

const createMutation = (encodedInitialName) => ({
    resource: `scheduler/queues/${encodedInitialName}`,
    type: 'update',
    data: ({ queue }) => queue,
})

const useUpdateQueue = ({ onSuccess, initialName } = {}) => {
    const engine = useDataEngine()
    const updateQueue = (queue) => {
        const encodedInitialName = encodeURIComponent(initialName)
        const mutation = createMutation(encodedInitialName)
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
