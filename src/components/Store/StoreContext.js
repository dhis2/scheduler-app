import { createContext } from 'react'

const StoreContext = createContext({
    jobs: {},
    jobTypes: {},
    parameterOptions: {},
    refetchJobs: () => {
        throw new Error('Store context needs a valid provider')
    },
})

export default StoreContext
