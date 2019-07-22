import React, { useEffect, useState } from 'react'
import { func, string, bool } from 'prop-types'
import { connect } from 'react-redux'
import { CircularLoader } from '@dhis2/ui-core'
import { actions, selectors } from '../../data/job-types'
import * as rootSelectors from '../../rootSelectors'
import { AbsoluteCenter } from '../../components/AbsoluteCenter'
import { FullscreenError } from '../../components/Errors'
import JobAdd from './JobAdd'

export const UnconnectedJobAddContainer = ({
    didFetch,
    errorMessage,
    fetchJobTypesIfNeeded,
}) => {
    useEffect(() => {
        fetchJobTypesIfNeeded()
    }, [fetchJobTypesIfNeeded])

    const [isPristine, setIsPristine] = useState(true)

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
        return <FullscreenError message={errorMessage} />
    }

    return <JobAdd isPristine={isPristine} setIsPristine={setIsPristine} />
}

UnconnectedJobAddContainer.propTypes = {
    didFetch: bool.isRequired,
    errorMessage: string.isRequired,
    fetchJobTypesIfNeeded: func.isRequired,
}

const mapStateToProps = state => {
    const jobTypes = rootSelectors.getJobTypes(state)

    return {
        didFetch: selectors.getDidFetch(jobTypes),
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
