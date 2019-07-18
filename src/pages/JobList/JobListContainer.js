import React, { useEffect, useState } from 'react'
import { object, arrayOf, func, string, bool } from 'prop-types'
import { connect } from 'react-redux'
import { CircularLoader } from '@dhis2/ui-core'
import { actions, selectors } from '../../data/jobs'
import * as rootSelectors from '../../rootSelectors'
import { selectors as entitySelectors } from '../../data/entities'
import { AbsoluteCenter } from '../../components/AbsoluteCenter'
import JobList from './JobList'

export const UnconnectedJobListContainer = ({
    didFetch,
    isFetching,
    isDirty,
    errorMessage,
    jobIds,
    jobEntities,
    fetchJobsIfNeeded,
}) => {
    useEffect(() => {
        fetchJobsIfNeeded()
    }, [fetchJobsIfNeeded, isDirty])

    const [showSystemJobs, setShowSystemJobs] = useState(false)
    const [jobFilter, setJobFilter] = useState('')

    // Show spinner when there are no jobs to display yet
    if (!didFetch) {
        return (
            <AbsoluteCenter vertical>
                <CircularLoader />
                Loading jobs
            </AbsoluteCenter>
        )
    }

    if (errorMessage) {
        return <span>{errorMessage}</span>
    }

    let filteredJobIds = jobIds

    // Filter system jobs if necessary
    if (!showSystemJobs) {
        filteredJobIds = filteredJobIds.filter(id => {
            const job = jobEntities[id]
            return job.configurable
        })
    }

    // Filter jobs by the jobFilter string
    filteredJobIds = filteredJobIds.filter(id => {
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
    didFetch: bool.isRequired,
    isFetching: bool.isRequired,
    isDirty: bool.isRequired,
    errorMessage: string.isRequired,
    jobIds: arrayOf(string).isRequired,
    jobEntities: object.isRequired,
    fetchJobsIfNeeded: func.isRequired,
}

const mapStateToProps = state => {
    const jobs = rootSelectors.getJobs(state)
    const entities = rootSelectors.getEntities(state)

    return {
        didFetch: selectors.getDidFetch(jobs),
        isFetching: selectors.getIsFetching(jobs),
        isDirty: selectors.getIsDirty(jobs),
        errorMessage: selectors.getErrorMessage(jobs),
        jobIds: selectors.getResult(jobs),
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
