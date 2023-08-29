import { useDataQuery } from '@dhis2/app-runtime'

const key = 'queue'
const createQuery = (encodedName) => ({
    [key]: {
        resource: `scheduler/queues/${encodedName}`,
        params: {
            fields: ['cronExpression', 'sequence', 'name'],
        },
    },
})

const useQueueByName = (name) => {
    const encodedName = encodeURIComponent(name)
    const fetch = useDataQuery(createQuery(encodedName))

    // Remove nesting from data
    if (fetch.data) {
        const data = fetch.data[key]
        return { ...fetch, data }
    }

    return fetch
}

export default useQueueByName
