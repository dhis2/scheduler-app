import { useDataQuery } from '@dhis2/app-runtime'

const key = 'job'
const createQuery = (id) => ({
    [key]: {
        resource: `jobConfigurations/${id}`,
        params: {
            fields: [
                'created',
                'configurable',
                'cronExpression',
                'delay',
                'id',
                'jobParameters',
                'jobType',
                'lastExecuted',
                'lastExecutedStatus',
                'name',
            ],
        },
    },
})

const useJobById = (id) => {
    const fetch = useDataQuery(createQuery(id))

    // Remove nesting from data
    if (fetch.data) {
        const data = fetch.data[key]
        return { ...fetch, data }
    }

    return fetch
}

export default useJobById
