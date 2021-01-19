import React, { useState } from 'react'
import { CircularLoader, Layer, CenteredContent } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import { RefetchJobsContext } from '../../components/Context'
import {
    getIds,
    getUserJobs,
    getEntities,
    getJobsMatchingFilter,
} from './selectors'
import JobList from './JobList'

const query = {
    jobs: {
        resource: 'jobConfigurations',
        params: {
            fields: '*',
            paging: false,
        },
    },
}

const JobListContainer = () => {
    const { loading, error, data, refetch } = useDataQuery(query)
    const [showSystemJobs, setShowSystemJobs] = useState(false)
    const [jobFilter, setJobFilter] = useState('')

    // Show spinner when there are no jobs to display yet
    if (loading) {
        return (
            <Layer>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </Layer>
        )
    }

    if (error) {
        /**
         * If we don't have any data to render this route is
         * useless, so throw the error and let the user know
         * they should refresh.
         */
        throw error
    }

    const jobs = data.jobs.jobConfigurations

    // Filter jobs by the jobFilter string
    const filteredJobs = getJobsMatchingFilter(jobs, jobFilter)

    // Show or hide system jobs
    const jobIds = showSystemJobs
        ? getIds(filteredJobs)
        : getIds(getUserJobs(filteredJobs))

    return (
        <RefetchJobsContext.Provider value={refetch}>
            <JobList
                jobIds={jobIds}
                jobEntities={getEntities(jobs)}
                isLoading={loading}
                showSystemJobs={showSystemJobs}
                setShowSystemJobs={setShowSystemJobs}
                jobFilter={jobFilter}
                setJobFilter={setJobFilter}
            />
        </RefetchJobsContext.Provider>
    )
}

export default JobListContainer
