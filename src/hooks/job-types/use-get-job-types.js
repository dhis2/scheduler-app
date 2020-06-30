/**
 * Selectors
 */

/**
 * Cleans up the endpoint for use with the data engine
 */

export const getParameterEndpoint = endpoint => {
    if (!endpoint || !endpoint.startsWith('/api/')) {
        return endpoint
    }

    // Remove the '/api/'
    return endpoint.slice(5)
}

/**
 * Find a jobType object by the jobType string
 */

export const getJobTypeObject = (jobTypes, jobType) => {
    return jobTypes.find(job => job.jobType === jobType)
}

/**
 * Returns an array with all parameters for a certain jobType
 */

export const getJobTypeParameters = (jobTypes, jobType) => {
    const selectedJobType = getJobTypeObject(jobTypes, jobType)
    const hasParameters = 'jobParameters' in selectedJobType

    if (!hasParameters) {
        return []
    }

    return selectedJobType.jobParameters
}
