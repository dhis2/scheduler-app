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
        const data = fetch.data[key].jobTypes

        return { ...fetch, data }
    }

    return fetch
}

export default useJobTypes
