import React, { useEffect, useState } from 'react'
import { object, arrayOf, func, string, bool } from 'prop-types'
import { connect } from 'react-redux'
import { CircularLoader } from '@dhis2/ui-core'
import { actions, selectors } from '../../data/jobs'
import * as rootSelectors from '../../rootSelectors'
import { selectors as entitySelectors } from '../../data/entities'
import JobList from './JobList'

export const UnconnectedJobListContainer = ({
    didFetchSuccessfully,
    isFetching,
    errorMessage,
    userJobIds,
    allJobIds,
    jobEntities,
    fetchJobsIfNeeded,
}) => {
    useEffect(() => {
        fetchJobsIfNeeded()
    }, [fetchJobsIfNeeded])

    const [showSystemJobs, setShowSystemJobs] = useState(false)
    const [jobFilter, setJobFilter] = useState('')

    // Show spinner when there are no jobs to display yet
    if (isFetching && !didFetchSuccessfully) {
        return <CircularLoader />
    }

    if (errorMessage) {
        return <span>{errorMessage}</span>
    }

    // Show all jobs, or just the user's jobs
    const jobIds = showSystemJobs ? allJobIds : userJobIds

    // Filter jobs by the jobFilter string
    const filteredJobIds = jobIds.filter(id => {
        const job = jobEntities[id]
        const name = job.name.toLowerCase()
        return name.includes(jobFilter.toLowerCase())
    })

    return (
        <JobList
            jobIds={filteredJobIds}
            jobEntities={jobEntities}
            isFetching={isFetching}
            showSystemJobs={showSystemJobs}
            setShowSystemJobs={setShowSystemJobs}
            jobFilter={jobFilter}
            setJobFilter={setJobFilter}
        />
    )
}

UnconnectedJobListContainer.propTypes = {
    didFetchSuccessfully: bool.isRequired,
    isFetching: bool.isRequired,
    errorMessage: string.isRequired,
    userJobIds: arrayOf(string).isRequired,
    allJobIds: arrayOf(string).isRequired,
    jobEntities: object.isRequired,
    fetchJobsIfNeeded: func.isRequired,
}

const mapStateToProps = state => {
    const jobs = rootSelectors.getJobs(state)
    const entities = rootSelectors.getEntities(state)

    return {
        didFetchSuccessfully: selectors.getDidFetchSuccessfully(jobs),
        isFetching: selectors.getIsFetching(jobs),
        errorMessage: selectors.getErrorMessage(jobs),
        userJobIds: entitySelectors.getUserJobIds(entities),
        allJobIds: selectors.getResult(jobs),
        jobEntities: entitySelectors.getJobs(entities),
    }
}

const mapDispatchToProps = {
    fetchJobsIfNeeded: actions.fetchJobsIfNeeded,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedJobListContainer)
