import React, { useState } from 'react'
import { CircularLoader, ScreenCover } from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import { selectors, useGetJobs } from '../../hooks/jobs'
import { RefetchJobsContext } from '../../components/Context'
import JobList from './JobList'

const JobListContainer = () => {
    const { loading, error, data, refetch } = useGetJobs()
    const [showSystemJobs, setShowSystemJobs] = useState(false)
    const [jobFilter, setJobFilter] = useState('')

    // Show spinner when there are no jobs to display yet
    if (loading) {
        return (
            <ScreenCover>
                <div>
                    <CircularLoader />
                </div>
                {i18n.t('Loading jobs')}
            </ScreenCover>
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
