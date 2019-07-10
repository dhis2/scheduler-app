import React from 'react'
import { func, string, bool } from 'prop-types'
import { connect } from 'react-redux'
import { Button } from '@dhis2/ui-core'
import * as rootSelectors from '../../rootSelectors'
import { selectors } from '../../data/jobs'
import { actions } from '../../data/modal'
import { modalTypes } from '../Modal'

export const UnconnectedDeleteJobButton = ({ id, showModal, isFetching }) => {
    return (
        <Button
            destructive
            name={`delete-job-${id}`}
            disabled={isFetching}
            onClick={() =>
                showModal({ type: modalTypes.DELETE_JOB, props: { id } })
            }
        >
            Delete
        </Button>
    )
}

UnconnectedDeleteJobButton.propTypes = {
    id: string.isRequired,
    isFetching: bool.isRequired,
    showModal: func.isRequired,
}

const mapStateToProps = state => {
    /* istanbul ignore next */
    const jobs = rootSelectors.getJobs(state)

    /* istanbul ignore next */
    return {
        isFetching: selectors.getIsFetching(jobs),
    }
}

const mapDispatchToProps = {
    showModal: actions.showModal,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedDeleteJobButton)
