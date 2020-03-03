import { useDataMutation } from '@dhis2/app-runtime'

const mutation = {
    resource: 'jobConfigurations',
    id: ({ id }) => id,
    type: 'update',
    partial: true,
    data: ({ enabled }) => ({ enabled }),
}

const useToggleJob = () => {
    return useDataMutation(mutation)
}

export default useToggleJob
