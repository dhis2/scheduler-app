import React, { useState, useContext } from 'react'
import { JobContext, selectors } from '../../components/JobStore'
import JobList from './JobList'

const JobListContainer = () => {
    const [showSystemJobs, setShowSystemJobs] = useState(false)
    const [jobFilter, setJobFilter] = useState('')
    const { jobs } = useContext(JobContext)

    // Filter jobs by the jobFilter string
    const filteredJobs = selectors.getJobsMatchingFilter(jobs, jobFilter)

    // Show or hide system jobs
    const jobIds = showSystemJobs
        ? selectors.getIds(filteredJobs)
        : selectors.getIds(selectors.getUserJobs(filteredJobs))

    return (
        <JobList
            jobIds={jobIds}
            jobEntities={selectors.getEntities(jobs)}
            showSystemJobs={showSystemJobs}
            setShowSystemJobs={setShowSystemJobs}
            jobFilter={jobFilter}
            setJobFilter={setJobFilter}
        />
    )
}

export default JobListContainer
