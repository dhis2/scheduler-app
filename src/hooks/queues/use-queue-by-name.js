import { useDataQuery } from '@dhis2/app-runtime'

const key = 'queue'
const createQuery = (name) => ({
    [key]: {
        resource: `scheduler/queues/${name}`,
        params: {
            fields: ['cronExpression', 'sequence', 'name'],
        },
    },
})

const useQueueByName = (name) => {
    const fetch = useDataQuery(createQuery(name))

    // Remove nesting from data
    if (fetch.data) {
        const data = fetch.data[key]
        return { ...fetch, data }
    }

    return fetch
}

export default useQueueByName
