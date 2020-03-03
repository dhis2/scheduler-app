import { useDataMutation } from '@dhis2/app-runtime'

const mutation = {
    resource: 'jobConfigurations',
    type: 'create',
    data: ({ job }) => job,
}

const useCreateJob = () => {
    return useDataMutation(mutation)
}

export default useCreateJob
