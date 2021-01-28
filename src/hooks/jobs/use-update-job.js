import { useContext } from 'react'
import { useDataEngine } from '@dhis2/app-runtime'
import { JobContext } from '../../components/JobStore'
import history from '../../services/history'
import formatError from '../../services/format-error'

const mutation = {
    resource: 'jobConfigurations',
    type: 'update',
    id: /* istanbul ignore next */ ({ id }) => id,
    data: /* istanbul ignore next */ ({ job }) => job,
}

const useUpdateJob = ({ id }) => {
    const { refetch } = useContext(JobContext)
    const engine = useDataEngine()
    const updateJob = job =>
        engine
            .mutate(mutation, { variables: { job, id } })
            .then(() => {
                history.push('/')
                refetch()
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
