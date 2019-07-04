import React, { useEffect } from 'react'
import { object, arrayOf, number, node, func, string, bool } from 'prop-types'
import { connect } from 'react-redux'
import { CircularLoader } from '@dhis2/ui-core'
import { actions, selectors } from '../../data/jobs'
import { getJobs } from '../../rootSelectors'
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
    children: node.isRequired,
    isFetching: bool.isRequired,
    errorMessage: string.isRequired,
    jobIds: arrayOf(number).isRequired,
    jobEntities: object.isRequired,
    fetchJobsIfNeeded: func.isRequired,
}

const mapStateToProps = state => {
    const jobs = getJobs(state)

    return {
        isFetching: selectors.getIsFetching(jobs),
        errorMessage: selectors.getErrorMessage(jobs),
        jobEntities: selectors.getEntities(jobs),
        jobIds: selectors.getIds(jobs),
    }
}

const mapDispatchToProps = {
    fetchJobsIfNeeded: actions.fetchJobsIfNeeded,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedJobListContainer)
