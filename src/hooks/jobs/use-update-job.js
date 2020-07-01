import { useDataEngine } from '@dhis2/app-runtime'
import history from '../../services/history'
import formatError from '../../services/format-error'

/**
 * A partial mutation, or PATCH, because PUT isn't allowed for this endpoint
 */
const mutation = {
    resource: 'jobConfigurations',
    type: 'update',
    partial: true,
    id: ({ id }) => id,
    data: ({ job }) => job,
}

const useUpdateJob = ({ id }) => {
    const engine = useDataEngine()
    const submitJob = job =>
        engine
            .mutate(mutation, { variables: { job, id } })
            .then(() => {
                history.push('/')
            })
            .catch(error => {
                const isValidationError = error.type === 'access'

                // Potential validation error, return it in a format final-form can handle
                if (isValidationError) {
                    return formatError(error)
                }

                // Throw any unexpected errors
                throw error
            })

    return [submitJob]
}

export default useUpdateJob
