import useJobSchedules from './use-job-schedules'

const useJobScheduleById = (id) => {
    const fetch = useJobSchedules()

    // Find schedule by id
    if (fetch.data) {
        if (!fetch.data?.find) {
            const error = new Error('Did not receive the expected schedules')
            return { ...fetch, error, data: undefined }
        }

        const data = fetch.data.find((schedule) => {
            return schedule.id === id
        })

        if (!data) {
            const error = new Error(`Could not find schedule with id ${id}`)
            return { ...fetch, data: undefined, error }
        }

        return { ...fetch, data }
    }

    return fetch
}

export default useJobScheduleById
