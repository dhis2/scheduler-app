import useJobType from './use-job-type'

const useJobTypeParameters = (jobType) => {
    const fetch = useJobType(jobType)

    // Return parameters when there is data
    if (fetch.data) {
        const data = fetch.data?.jobParameters || []

        return { ...fetch, data }
    }

    return fetch
}

export default useJobTypeParameters
