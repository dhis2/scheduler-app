import React, { useEffect } from 'react'
import { object, arrayOf, func, string, bool } from 'prop-types'
import { connect } from 'react-redux'
import { CircularLoader } from '@dhis2/ui-core'
import { actions, selectors } from '../../data/jobs'
import * as rootSelectors from '../../rootSelectors'
import { selectors as entitySelectors } from '../../data/entities'
import JobList from './JobList'

export const UnconnectedJobListContainer = ({
    isFetching,
    errorMessage,
    jobIds,
    jobEntities,
    fetchJobsIfNeeded,
}) => {
    useEffect(() => {
        fetchJobsIfNeeded()
    }, [fetchJobsIfNeeded])

    if (isFetching) {
        return <CircularLoader />
    }

    if (errorMessage) {
        return <span>{errorMessage}</span>
    }

    return <JobList jobIds={jobIds} jobEntities={jobEntities} />
}

UnconnectedJobListContainer.propTypes = {
    isFetching: bool.isRequired,
    errorMessage: string.isRequired,
    jobIds: arrayOf(string).isRequired,
    jobEntities: object.isRequired,
    fetchJobsIfNeeded: func.isRequired,
}

const mapStateToProps = state => {
    const jobs = rootSelectors.getJobs(state)
    const entities = rootSelectors.getEntities(state)

    return {
        isFetching: selectors.getIsFetching(jobs),
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
