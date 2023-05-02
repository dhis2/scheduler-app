import useJobs from './use-jobs'

const useJobById = (id) => {
    const fetch = useJobs()

    // Find job by id
    if (fetch.data) {
        if (!fetch.data?.find) {
            const error = new Error('Did not receive the expected jobs')
            return { ...fetch, error, data: undefined }
        }

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
