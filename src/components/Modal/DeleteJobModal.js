import React from 'react'
import { func, string } from 'prop-types'
import { Button, Modal, ButtonStrip } from '@dhis2/ui-core'
import { connect } from 'react-redux'
import { actions as modalActions } from '../../data/modal'
import { actions as jobActions } from '../../data/jobs'

export const UnconnectedDeleteJobModal = ({ id, hideModal, deleteJob }) => (
    <Modal open small onClose={hideModal}>
        <Modal.Content>Are you sure you want to delete this job?</Modal.Content>
        <Modal.Actions>
            <ButtonStrip end>
                <Button secondary name="hide-modal" onClick={hideModal}>
                    Cancel
                </Button>
                <Button
                    destructive
                    name={`delete-job-${id}`}
                    onClick={() => {
                        deleteJob(id)
                        hideModal()
                    }}
                >
                    Delete
                </Button>
            </ButtonStrip>
        </Modal.Actions>
    </Modal>
)

UnconnectedDeleteJobModal.propTypes = {
    id: string.isRequired,
    hideModal: func.isRequired,
    deleteJob: func.isRequired,
}

const mapDispatchToProps = {
    deleteJob: jobActions.deleteJob,
    hideModal: modalActions.hideModal,
}

export default connect(
    null,
    mapDispatchToProps
)(UnconnectedDeleteJobModal)
