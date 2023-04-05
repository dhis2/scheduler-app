import useJobTypes from './use-job-types'

const useJobType = (jobType) => {
    const fetch = useJobTypes()

    // Select requested job type when there is data
    if (fetch.data) {
        const hasJobType = jobType in fetch.data

        if (!hasJobType) {
            const error = new Error('Job type could not be found')
            return { ...fetch, error }
        }

        const data = fetch.data[jobType]

        return { ...fetch, data }
    }

    return fetch
}

export default useJobType
