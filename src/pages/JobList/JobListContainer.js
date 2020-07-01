import React, { useState } from 'react'
import { CircularLoader, Layer, CenteredContent } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { useDataQuery } from '@dhis2/app-runtime'
import { RefetchJobsContext } from '../../components/Context'
import { getIds, getUserJobIds, getEntities } from './selectors'
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
                    {i18n.t('Loading jobs')}
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

    const allJobIds = getIds(data.jobs.jobConfigurations)
    const userJobIds = getUserJobIds(data.jobs.jobConfigurations)
    const jobEntities = getEntities(data.jobs.jobConfigurations)

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
