import { useContext } from 'react'
import StoreContext from './StoreContext'

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
