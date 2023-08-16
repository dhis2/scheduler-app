import { useDataQuery } from '@dhis2/app-runtime'

const key = 'jobs'
const query = {
    [key]: {
        resource: 'jobConfigurations',
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
}

const useJobs = () => {
    const fetch = useDataQuery(query)

    // Remove nesting from data
    if (fetch.data) {
        const data = fetch.data?.[key]?.jobConfigurations

        if (!data) {
            const error = new Error(
                'Did not receive the expected job configurations'
            )
            return { ...fetch, error, data: undefined }
        }

        return { ...fetch, data }
    }

    return fetch
}

export default useJobs
