import { useDataQuery } from '@dhis2/app-runtime'

const key = 'schedules'
const query = {
    [key]: {
        resource: 'scheduler',
    },
}

const useSchedules = () => {
    const fetch = useDataQuery(query)

    // Remove nesting from data and move the id up
    if (fetch.data) {
        const schedules = fetch.data?.[key]

        if (!schedules?.map) {
            const error = new Error('Did not receive the expected schedules')
            return { ...fetch, error, data: undefined }
        }

        const data = schedules.map((schedule) => {
            const id = schedule.sequence?.[0]?.id
            return { ...schedule, id }
        })

        return { ...fetch, data }
    }

    return fetch
}

export default useSchedules
