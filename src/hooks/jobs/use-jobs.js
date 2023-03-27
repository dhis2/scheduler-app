import { useDataQuery } from '@dhis2/app-runtime'

const key = 'jobs'
const query = {
    [key]: {
        resource: 'jobConfigurations',
        params: {
            fields: [
                'created',
                'cronExpression',
                'id',
                'jobType',
                'lastExecuted',
                'lastExecutedStatus',
                'name',
            ],
        },
    },
}

const useJobs = () => {
    const fetch = useDataQuery(query)

    // Remove nesting from data
    if (fetch.data) {
        const data = fetch.data[key].jobConfigurations

        return { ...fetch, data }
    }

    return fetch
}

export default useJobs
