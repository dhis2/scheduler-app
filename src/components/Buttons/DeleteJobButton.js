import React from 'react'
import { func, string, bool } from 'prop-types'
import { connect } from 'react-redux'
import { Button } from '@dhis2/ui-core'
import * as rootSelectors from '../../rootSelectors'
import { actions, selectors } from '../../data/jobs'

export const UnconnectedDeleteJobButton = ({ id, isFetching, deleteJob }) => {
    return (
        <Button
            destructive
            disabled={isFetching}
            name={`delete-button-${id}`}
            onClick={() => deleteJob(id)}
        >
            Delete
        </Button>
    )
}

UnconnectedDeleteJobButton.propTypes = {
    id: string.isRequired,
    isFetching: bool.isRequired,
    deleteJob: func.isRequired,
}

const mapStateToProps = state => {
    const jobs = rootSelectors.getJobs(state)

    return {
        isFetching: selectors.getIsFetching(jobs),
    }
}

const mapDispatchToProps = {
    deleteJob: actions.deleteJob,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedDeleteJobButton)
