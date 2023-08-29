import { useDataEngine } from '@dhis2/app-runtime'
import formatError from '../../services/format-error'

const createMutation = (encodedName) => ({
    resource: `scheduler/queues/${encodedName}`,
    type: 'create',
    data: ({ queue }) => queue,
})

const useSubmitQueue = ({ onSuccess } = {}) => {
    const engine = useDataEngine()
    const submitQueue = (queue) => {
        const encodedName = encodeURIComponent(queue.name)
        const mutation = createMutation(encodedName)
        return engine
            .mutate(mutation, { variables: { queue } })
            .then(() => {
                if (onSuccess) {
                    onSuccess()
                }
            })
            .catch((error) => formatError(error))
    }

    return [submitQueue]
}

export default useSubmitQueue
