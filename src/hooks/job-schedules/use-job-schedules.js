import { useDataQuery } from '@dhis2/app-runtime'

const key = 'schedules'
const query = {
    [key]: {
        resource: 'scheduler',
    },
}

const useJobSchedules = () => {
    const fetch = useDataQuery(query)

    // Remove nesting from data and move the id up
    if (fetch.data?.[key]?.map) {
        const data = fetch.data[key].map((job) => {
            const id = job.sequence?.[0]?.id
            return { ...job, id }
        })

        return { ...fetch, data }
    }

    return fetch
}

export default useJobSchedules
