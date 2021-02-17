import React from 'react'
import { hooks } from '../../components/Store'
import JobList from './JobList'

const JobListContainer = () => {
    const [jobFilter, setJobFilter] = hooks.useJobFilter()
    const [showSystemJobs, setShowSystemJobs] = hooks.useShowSystemJobs()
    const jobs = hooks.useJobListJobs()

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
