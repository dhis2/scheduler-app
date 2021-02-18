import React, { useState, useContext } from 'react'
import { StoreContext, selectors } from '../../components/Store'
import JobList from './JobList'
import { getJobsMatchingFilter, getUserJobs } from './selectors'

const JobListContainer = () => {
    const [showSystemJobs, setShowSystemJobs] = useState(false)
    const [jobFilter, setJobFilter] = useState('')
    const store = useContext(StoreContext)
    const allJobs = selectors.getJobsStore(store)

    // Filter jobs by the jobFilter string
    const filteredJobs = getJobsMatchingFilter(allJobs, jobFilter)

    // Show or hide system jobs
    const jobs = showSystemJobs ? filteredJobs : getUserJobs(filteredJobs)

    return (
        <JobList
            jobs={jobs}
            showSystemJobs={showSystemJobs}
            setShowSystemJobs={setShowSystemJobs}
            jobFilter={jobFilter}
            setJobFilter={setJobFilter}
        />
    )
}

export default JobListContainer
