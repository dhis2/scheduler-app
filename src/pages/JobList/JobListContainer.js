import React from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { CircularLoader } from '@dhis2/ui-core'
import JobList from './JobList'

const JobListContainer = () => {
    const { loading, error, data } = useDataQuery({
        jobs: {
            resource: 'jobConfigurations',
            fields: '*',
        },
    })

    if (loading) {
        return <CircularLoader />
    }

    if (error) {
        return <span>{error.message}</span>
    }

    return <JobList jobs={data.jobs.jobConfigurations} />
}

export default JobListContainer
