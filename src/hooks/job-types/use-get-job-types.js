import { useDataQuery } from '@dhis2/app-runtime'

const query = {
    jobTypes: {
        resource: 'jobConfigurations/jobTypesExtended',
    },
}

const useGetJobTypes = () => {
    const { loading, error, data, refetch } = useDataQuery(query)

    if (data && data.jobTypes) {
        return { loading, error, refetch, data: data.jobTypes }
    }

    return { loading, error, refetch, data }
}

export default useGetJobTypes

/**
 * Selectors
 */

export const getJobTypes = jobTypes => {
    return Object.keys(jobTypes)
}

/**
 * Returns the parameter and cleans up the endpoint for use with the data engine
 */

const formatEndpoint = endpoint => {
    if (!endpoint || !endpoint.startsWith('/api/')) {
        return endpoint
    }

    // Remove the '/api/'
    return endpoint.slice(5)
}

export const getJobTypeParameter = (jobTypes, jobType, parameterName) => {
    const job = jobTypes[jobType]
    const parameter = job[parameterName]

    return {
        ...parameter,
        relativeApiEndpoint: formatEndpoint(parameter.relativeApiEndpoint),
    }
}

/**
 * Returns an array with all parameters for a certain jobType
 */

export const getJobTypeParameters = (jobTypes, jobType) => {
    const parameterNames = Object.keys(jobTypes[jobType])

    return parameterNames.map(parameterName =>
        getJobTypeParameter(jobTypes, jobType, parameterName)
    )
}
