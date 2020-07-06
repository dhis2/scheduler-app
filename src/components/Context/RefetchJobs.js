import { createContext } from 'react'

const message =
    'RefetchJobsContext consumer needs to have a valid Provider as parent'

// Throws an error if the consumer is not nested in a provider
const RefetchJobsContext = createContext(() => {
    throw new Error(message)
})

export default RefetchJobsContext
