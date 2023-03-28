import React from 'react'
import { CircularLoader, Layer, CenteredContent } from '@dhis2/ui'
import { useJobSchedules } from '../../hooks/job-schedule'
import { hooks } from '../../components/Store'
import JobList from './JobList'

const JobListContainer = () => {
    const [jobFilter, setJobFilter] = hooks.useJobFilter()
    const [showSystemJobs, setShowSystemJobs] = hooks.useShowSystemJobs()
    const { data, loading, error } = useJobSchedules()

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
        throw error
    }

    // Filter jobs by the current jobFilter
    const applyJobFilter = (job) =>
        job.name.toLowerCase().includes(jobFilter.toLowerCase())

    // Filter jobs depending on the current showSystemJobs
    const applyShowSystemJobs = (job) =>
        // Jobs that are configurable are user jobs
        showSystemJobs ? true : job.configurable

    const jobs = data.filter(applyJobFilter).filter(applyShowSystemJobs)

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
