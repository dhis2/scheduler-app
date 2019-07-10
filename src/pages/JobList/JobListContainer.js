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

    if (isFetching && !didFetchSuccessfully) {
        return <CircularLoader />
    }

    if (errorMessage) {
        return <span>{errorMessage}</span>
    }

    return (
        <JobList
            jobIds={showSystemJobs ? allJobIds : userJobIds}
            jobEntities={jobEntities}
            isFetching={isFetching}
            showSystemJobs={showSystemJobs}
            setShowSystemJobs={setShowSystemJobs}
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
