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
            .catch((error) => formatError(error))

    return [submitJob]
}

export default useSubmitJob
