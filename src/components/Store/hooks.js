import { useContext } from 'react'
import StoreContext from './StoreContext'

export const useAllJobs = () => {
    const store = useContext(StoreContext)
    return store.jobs
}

export const useAllParameterOptions = () => {
    const store = useContext(StoreContext)
    return store.parameterOptions
}

export const useAllJobTypes = () => {
    const store = useContext(StoreContext)
    return store.jobTypes
}

export const useRefetchJobs = () => {
    const store = useContext(StoreContext)
    return store.refetchJobs
}

/**
 * The state for the job filter and showing system
 * jobs is used in the job list, but kept in the
 * store since it has to persist after a refetch.
 */
export const useJobFilter = () => {
    const store = useContext(StoreContext)
    return store.jobFilter
}

export const useShowSystemJobs = () => {
    const store = useContext(StoreContext)
    return store.showSystemJobs
}

/**
 * This hook returns the list of jobs that's shown in the
 * job list route. The list is filtered by the job filter
 * string and the show system jobs toggle from the store
 * state.
 */
export const useJobListJobs = () => {
    const [jobFilter] = useJobFilter()
    const [showSystemJobs] = useShowSystemJobs()
    const jobs = useAllJobs()

    // Filter jobs by the current jobFilter
    const applyJobFilter = (job) =>
        job.displayName.toLowerCase().includes(jobFilter.toLowerCase())

    // Filter jobs depending on the current showSystemJobs
    const applyShowSystemJobs = (job) =>
        // Jobs that are configurable are user jobs
        showSystemJobs ? true : job.configurable

    return jobs.filter(applyJobFilter).filter(applyShowSystemJobs)
}

// Finds a job by id
export const useJob = (id) => {
    const jobs = useAllJobs()
    return jobs.find((job) => job.id === id)
}

// Finds a jobType by the jobType string
export const useJobType = (jobType) => {
    const jobTypes = useAllJobTypes()
    return jobTypes.find((job) => job.jobType === jobType)
}

// Returns an array with all parameters for a certain jobType
export const useJobTypeParameters = (jobType) => {
    const selectedJobType = useJobType(jobType)
    const hasParameters = 'jobParameters' in selectedJobType

    if (!hasParameters) {
        return []
    }

    return selectedJobType.jobParameters
}

// Returns the parameter options for a given parameter
export const useParameterOptions = (parameter) => {
    const parameterOptions = useAllParameterOptions()
    return parameterOptions[parameter]
}
