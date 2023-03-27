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

    return (
        <JobList
            jobs={data}
            showSystemJobs={showSystemJobs}
            setShowSystemJobs={setShowSystemJobs}
            jobFilter={jobFilter}
            setJobFilter={setJobFilter}
        />
    )
}

export default JobListContainer
