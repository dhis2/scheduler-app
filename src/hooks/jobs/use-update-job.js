import { useDataEngine } from '@dhis2/app-runtime'
import formatError from '../../services/format-error'

const mutation = {
    resource: 'jobConfigurations',
    type: 'update',
    id: /* istanbul ignore next */ ({ id }) => id,
    data: /* istanbul ignore next */ ({ job }) => job,
}

const useUpdateJob = ({ onSuccess, id } = {}) => {
    const engine = useDataEngine()
    const updateJob = (job) =>
        engine
            .mutate(mutation, { variables: { job, id } })
            .then(() => {
                if (onSuccess) {
                    onSuccess()
                }
            })
            .catch((error) => formatError(error))

    return [updateJob]
}

export default useUpdateJob
