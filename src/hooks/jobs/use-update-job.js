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
    id: /* istanbul ignore next */ ({ id }) => id,
    data: /* istanbul ignore next */ ({ job }) => job,
}

const useUpdateJob = ({ id }) => {
    const engine = useDataEngine()
    const updateJob = job =>
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

    return [updateJob]
}

export default useUpdateJob
