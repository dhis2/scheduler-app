import React from 'react'
import { func, string, bool } from 'prop-types'
import { connect } from 'react-redux'
import { Button } from '@dhis2/ui-core'
import * as rootSelectors from '../../rootSelectors'
import { selectors } from '../../data/jobs'
import { actions } from '../../data/modal'
import { modalTypes } from '../Modal'

export const DumbRunJobButton = ({ id, showModal, isFetching }) => {
    return (
        <Button
            primary
            name={`run-job-${id}`}
            disabled={isFetching}
            onClick={() =>
                showModal({ type: modalTypes.RUN_JOB, props: { id } })
            }
        >
            Run manually
        </Button>
    )
}

DumbRunJobButton.propTypes = {
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
)(DumbRunJobButton)
