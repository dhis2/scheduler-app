import { useContext } from 'react'
import StoreContext from './StoreContext'

/**
 * These hooks are used in the job and queue list, but are connected
 * to the store since they have to persist after a refetch.
 */

export const useNameFilter = () => {
    const store = useContext(StoreContext)
    return store.nameFilter
}

export const useShowSystemJobs = () => {
    const store = useContext(StoreContext)
    return store.showSystemJobs
}
