import { useDataEngine } from '@dhis2/app-runtime'
import formatError from '../../services/format-error'

const createMutation = (name) => ({
    resource: `scheduler/queues/${name}`,
    type: 'create',
    data: ({ queue }) => queue,
})

const useSubmitQueue = ({ onSuccess } = {}) => {
    const engine = useDataEngine()
    const submitQueue = (queue) => {
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

    return [submitQueue]
}

export default useSubmitQueue
