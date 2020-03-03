import React, { useState } from 'react'
import { CircularLoader } from '@dhis2/ui-core'
import { selectors, useGetJobs } from '../../hooks/jobs'
import { AbsoluteCenter } from '../../components/AbsoluteCenter'
import { FullscreenError } from '../../components/Errors'
import { RefetchJobsContext } from '../../components/Context'
import JobList from './JobList'

const JobListContainer = () => {
    const { loading, error, data, refetch } = useGetJobs()
    const [showSystemJobs, setShowSystemJobs] = useState(false)
    const [jobFilter, setJobFilter] = useState('')

    // Show spinner when there are no jobs to display yet
    if (loading) {
        return (
            <AbsoluteCenter vertical>
                <CircularLoader />
                Loading jobs
            </AbsoluteCenter>
        )
    }

    if (error) {
        return <FullscreenError message={error.message} />
    }

    const allJobIds = selectors.getIds(data)
    const userJobIds = selectors.getUserJobIds(data)
    const jobEntities = selectors.getEntities(data)

    let jobIds = showSystemJobs ? allJobIds : userJobIds

    // Filter jobs by the jobFilter string
    jobIds = jobIds.filter(id => {
        const job = jobEntities[id]
        const name = job.name.toLowerCase()
        return name.includes(jobFilter.toLowerCase())
    })

    return (
        <RefetchJobsContext.Provider value={refetch}>
            <JobList
                jobIds={jobIds}
                jobEntities={jobEntities}
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
