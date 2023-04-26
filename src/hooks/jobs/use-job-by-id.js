import useJobs from './use-jobs'

const useJobById = (id) => {
    const fetch = useJobs()

    // Find job by id
    if (fetch.data) {
        const data = fetch.data.find((job) => {
            return job.id === id
        })

        if (!data) {
            const error = new Error(`Could not find job with id ${id}`)
            return { ...fetch, data: undefined, error }
        }

        return { ...fetch, data }
    }

    return fetch
}

export default useJobById
