import { createContext } from 'react'

const JobContext = createContext({
    refetch: () => {
        throw new Error('JobContext needs a valid provider')
    },
    jobs: {},
})

export default JobContext
