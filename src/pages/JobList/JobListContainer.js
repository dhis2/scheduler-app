import React, { useEffect, useState } from 'react'
import { object, arrayOf, func, string, bool } from 'prop-types'
import { connect } from 'react-redux'
import { CircularLoader } from '@dhis2/ui-core'
import { actions, selectors } from '../../data/jobs'
import * as rootSelectors from '../../rootSelectors'
import { AbsoluteCenter } from '../../components/AbsoluteCenter'
import { FullscreenError } from '../../components/Errors'
import JobList from './JobList'

export const DumbJobListContainer = ({
    didFetch,
    isFetching,
    isDirty,
    errorMessage,
    allJobIds,
    userJobIds,
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
        return <FullscreenError message={errorMessage} />
    }

    let jobIds = showSystemJobs ? allJobIds : userJobIds

    // Filter jobs by the jobFilter string
    jobIds = jobIds.filter(id => {
        const job = jobEntities[id]
        const name = job.name.toLowerCase()
        return name.includes(jobFilter.toLowerCase())
    })

    return (
        <JobList
            jobIds={jobIds}
            jobEntities={jobEntities}
            isFetching={isFetching}
            showSystemJobs={showSystemJobs}
            setShowSystemJobs={setShowSystemJobs}
            jobFilter={jobFilter}
            setJobFilter={setJobFilter}
        />
    )
}

DumbJobListContainer.propTypes = {
    didFetch: bool.isRequired,
    isFetching: bool.isRequired,
    isDirty: bool.isRequired,
    errorMessage: string.isRequired,
    allJobIds: arrayOf(string).isRequired,
    userJobIds: arrayOf(string).isRequired,
    jobEntities: object.isRequired,
    fetchJobsIfNeeded: func.isRequired,
}

const mapStateToProps = state => {
    const jobs = rootSelectors.getJobs(state)

    return {
        didFetch: selectors.getDidFetch(jobs),
        isFetching: selectors.getIsFetching(jobs),
        isDirty: selectors.getIsDirty(jobs),
        errorMessage: selectors.getErrorMessage(jobs),
        allJobIds: selectors.getIds(jobs),
        userJobIds: selectors.getUserJobIds(jobs),
        jobEntities: selectors.getEntities(jobs),
    }
}

const mapDispatchToProps = {
    fetchJobsIfNeeded: actions.fetchJobsIfNeeded,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DumbJobListContainer)
