import { useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'

const key = 'job'

const useJobById = (id) => {
    const [query] = useState({
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
    const fetch = useDataQuery(query)

    // Remove nesting from data
    if (fetch.data) {
        const data = fetch.data[key]
        return { ...fetch, data }
    }

    return fetch
}

export default useJobById
