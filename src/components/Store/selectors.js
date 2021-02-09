export const getJobsStore = store => store.jobs
export const getJobTypesStore = store => store.jobTypes
export const getParameterOptionsStore = store => store.parameterOptions
export const getRefetchJobs = store => store.refetchJobs

/**
 * Jobs
 */

// Returns the first job that matches the provided id
export const getJobById = (store, id) => {
    const jobs = getJobsStore(store)

    return jobs.find(job => job.id === id)
}

/**
 * Job types
 */

// Find a jobType entity for a given jobType
export const getJobType = (store, jobType) => {
    const jobTypes = getJobTypesStore(store)

    return jobTypes.find(job => job.jobType === jobType)
}

// Returns an array with all parameters for a certain jobType
export const getJobTypeParameters = (store, jobType) => {
    const selectedJobType = getJobType(store, jobType)
    const hasParameters = 'jobParameters' in selectedJobType

    if (!hasParameters) {
        return []
    }

    return selectedJobType.jobParameters
}

/**
 * Parameter options
 */

// Returns the parameter options for a given parameter
export const getParameterOptions = (store, parameter) => {
    const parameterOptions = getParameterOptionsStore(store)

    return parameterOptions[parameter]
}
