import { useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'

const key = 'queue'

const useQueueByName = (name) => {
    const encodedName = encodeURIComponent(name)
    const [query] = useState({
        [key]: {
            resource: `scheduler/queues/${encodedName}`,
            params: {
                fields: ['cronExpression', 'sequence', 'name'],
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

export default useQueueByName
