import { useDataQuery } from '@dhis2/app-runtime'

const key = 'queueables'
const query = {
    [key]: {
        resource: 'scheduler/queueable',
    },
}

const useQueueables = () => {
    const fetch = useDataQuery(query)

    // Remove nesting from data and move the id up
    if (fetch.data) {
        const queueables = fetch.data[key]

        if (!queueables?.map) {
            const error = new Error('Did not receive the expected queueables')
            return { ...fetch, error, data: undefined }
        }

        const data = queueables.map((queueable) => {
            const id = queueable.sequence?.[0]?.id
            return { ...queueable, id }
        })

        return { ...fetch, data }
    }

    return fetch
}

export default useQueueables
