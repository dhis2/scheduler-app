import useJobs from './use-jobs'

const useJobById = (id) => {
    const fetch = useJobs()

    // Find job by id
    if (fetch.data) {
        const data = fetch.data.find((job) => {
            return job.id === id
        })

        return { ...fetch, data }
    }

    return fetch
}

export default useJobById
