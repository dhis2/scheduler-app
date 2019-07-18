import React, { useEffect } from 'react'
import { func, string, bool } from 'prop-types'
import { connect } from 'react-redux'
import { CircularLoader } from '@dhis2/ui-core'
import { actions, selectors } from '../../data/job-types'
import * as rootSelectors from '../../rootSelectors'
import { AbsoluteCenter } from '../../components/AbsoluteCenter'
import JobAdd from './JobAdd'

export const UnconnectedJobAddContainer = ({
    didFetch,
    errorMessage,
    fetchJobTypesIfNeeded,
}) => {
    useEffect(() => {
        fetchJobTypesIfNeeded()
    }, [fetchJobTypesIfNeeded])

    // Show spinner when the options haven't loaded yet
    if (!didFetch) {
        return (
            <AbsoluteCenter vertical>
                <CircularLoader />
                Loading form options
            </AbsoluteCenter>
        )
    }

    if (errorMessage) {
        return <span>{errorMessage}</span>
    }

    return <JobAdd />
}

UnconnectedJobAddContainer.propTypes = {
    didFetch: bool.isRequired,
    isFetching: bool.isRequired,
    errorMessage: string.isRequired,
    createJob: func.isRequired,
    fetchJobTypesIfNeeded: func.isRequired,
}

const mapStateToProps = state => {
    const jobTypes = rootSelectors.getJobTypes(state)

    return {
        didFetch: selectors.getDidFetch(jobTypes),
        isFetching: selectors.getIsFetching(jobTypes),
        errorMessage: selectors.getErrorMessage(jobTypes),
    }
}

const mapDispatchToProps = {
    fetchJobTypesIfNeeded: actions.fetchJobTypesIfNeeded,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedJobAddContainer)
