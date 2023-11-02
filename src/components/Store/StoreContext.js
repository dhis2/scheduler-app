import { createContext } from 'react'

const StoreContext = createContext({
    jobAndQueueFilter: '',
    showSystemJobs: false,
})

export default StoreContext
