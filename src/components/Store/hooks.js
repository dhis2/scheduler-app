import { useContext } from 'react'
import StoreContext from './StoreContext'

export const useJobs = () => {
    const store = useContext(StoreContext)
    return store.jobs
}

/**
 * This state is used in the job list, but kept in the
 * store since it has to persist after a refetch.
 */
export const useJobFilter = () => {
    const store = useContext(StoreContext)
    return store.jobFilter
}

/**
 * This state is used in the job list, but kept in the
 * store since it has to persist after a refetch.
 */
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
export const useListJobs = () => {
    const [jobFilter] = useJobFilter()
    const [showSystemJobs] = useShowSystemJobs()
    const jobs = useJobs()

    // Filter jobs by the current jobFilter
    const applyJobFilter = job =>
        job.name.toLowerCase().includes(jobFilter.toLowerCase())

    // Filter jobs depending on the current showSystemJobs
    const applyShowSystemJobs = job =>
        // Jobs that are configurable are user jobs
        showSystemJobs ? true : job.configurable

    return jobs.filter(applyJobFilter).filter(applyShowSystemJobs)
}
