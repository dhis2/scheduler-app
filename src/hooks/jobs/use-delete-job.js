import { useDataMutation } from '@dhis2/app-runtime'

const mutation = {
    resource: 'jobConfigurations',
    id: ({ id }) => id,
    type: 'delete',
}

const useDeleteJob = () => {
    return useDataMutation(mutation)
}

export default useDeleteJob
