import { createContext } from 'react'

const StoreContext = createContext({
    jobFilter: '',
    showSystemJobs: false,
})

export default StoreContext
