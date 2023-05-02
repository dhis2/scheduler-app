import useJobType from './use-job-type'

const useJobTypeParameters = (jobType) => {
    const fetch = useJobType(jobType)

    // Return parameters when there is data
    if (fetch.data) {
        const parameters = fetch.data?.jobParameters

        if (!parameters) {
            return { ...fetch, data: [] }
        }

        return { ...fetch, data: parameters }
    }

    return fetch
}

export default useJobTypeParameters
