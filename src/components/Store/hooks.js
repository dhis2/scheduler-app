import { useContext } from 'react'
import StoreContext from './StoreContext'

/**
 * This hook is used in the job and queue list, but is connected
 * to the store since it has to persist after a refetch.
 */

export const useStore = () => {
    return useContext(StoreContext)
}
