import { createContext } from 'react'

const JobContext = createContext({ refetch: () => {}, jobs: {} })

export default JobContext
