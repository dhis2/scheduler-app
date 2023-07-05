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
            .catch((error) => formatError(error))
    }

    return [submitJobQueue]
}

export default useSubmitJobQueue
