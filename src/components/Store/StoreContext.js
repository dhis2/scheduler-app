import { createContext } from 'react'

const StoreContext = createContext({
    nameFilter: '',
    showSystemJobs: false,
})

export default StoreContext
