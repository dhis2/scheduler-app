import { useDataQuery } from '@dhis2/app-runtime'

const query = {
    jobs: {
        resource: 'jobConfigurations',
        params: {
            fields: '*',
            paging: false,
        },
    },
}

const useGetJobs = () => {
    const { loading, error, data, refetch } = useDataQuery(query)

    if (data && data.jobs && data.jobs.jobConfigurations) {
        return { loading, error, refetch, data: data.jobs.jobConfigurations }
    }

    return { loading, error, refetch, data }
}

export default useGetJobs

/**
 * Selectors
 */

export const getEntities = jobs => {
    return jobs.reduce((entities, job) => {
        const id = job.id
        entities[id] = job

        return entities
    }, {})
}

export const getIds = jobs => {
    return jobs.map(job => job.id)
}

export const getUserJobIds = jobs => {
    return jobs.filter(job => job.configurable).map(job => job.id)
}
