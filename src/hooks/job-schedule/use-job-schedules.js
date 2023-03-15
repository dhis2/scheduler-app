import { useDataQuery } from '@dhis2/app-runtime'

const key = 'schedules'
const query = {
    [key]: {
        resource: 'scheduler',
    },
}

const useJobSchedules = () => {
    const fetch = useDataQuery(query)

    // Remove nesting from data
    if (!fetch.loading && !fetch.error && fetch.data) {
        const data = fetch.data[key]
        return [...fetch, data]
    }

    return fetch
}

export default useJobSchedules
