import { useDataQuery } from '@dhis2/app-runtime'

const key = 'jobTypes'
const query = {
    [key]: {
        resource: 'jobConfigurations/jobTypes',
        params: {
            fields: '*',
            paging: false,
        },
    },
}

const useJobTypes = () => {
    const fetch = useDataQuery(query)

    // Remove nesting from data
    if (fetch.data) {
        const data = fetch.data?.[key]?.jobTypes

        if (!data) {
            const error = new Error('Did not receive the expected job types')
            return { ...fetch, error, data: undefined }
        }

        return { ...fetch, data }
    }

    return fetch
}

export default useJobTypes
