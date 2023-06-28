import { useDataEngine } from '@dhis2/app-runtime'
import formatError from '../../services/format-error'

const mutation = {
    resource: 'jobConfigurations',
    type: 'create',
    data: /* istanbul ignore next */ ({ job }) => job,
}

const useSubmitJob = ({ onSuccess } = {}) => {
    const engine = useDataEngine()
    const submitJob = (job) =>
        engine
            .mutate(mutation, { variables: { job } })
            .then(() => {
                if (onSuccess) {
                    onSuccess()
                }
            })
            .catch((error) => {
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

export default useSubmitJob
