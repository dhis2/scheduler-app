import { useDataQuery } from '@dhis2/app-runtime'

const key = 'jobsAndQueues'
const query = {
    [key]: {
        resource: 'scheduler',
    },
}

const useJobsAndQueues = () => {
    const fetch = useDataQuery(query)

    // Remove nesting from data and move the id up
    if (fetch.data) {
        const jobsAndQueues = fetch.data?.[key]

        if (!jobsAndQueues?.map) {
            const error = new Error(
                'Did not receive the expected jobs and queues'
            )
            return { ...fetch, error, data: undefined }
        }

        const data = jobsAndQueues.map((jobOrQueue) => {
            const id = jobOrQueue.sequence?.[0]?.id
            return { ...jobOrQueue, id }
        })

        return { ...fetch, data }
    }

    return fetch
}

export default useJobsAndQueues
