import React from 'react'
import { func, string } from 'prop-types'
import {
    Button,
    Modal,
    ModalContent,
    ModalActions,
    ButtonStrip,
} from '@dhis2/ui-core'
import { connect } from 'react-redux'
import { actions as modalActions } from '../../data/modal'
import { actions as jobActions } from '../../data/jobs'

export const DumbDeleteJobModal = ({ id, hideModal, deleteJob }) => (
    <Modal open small onClose={hideModal}>
        <ModalContent>Are you sure you want to delete this job?</ModalContent>
        <ModalActions>
            <ButtonStrip end>
                <Button name="hide-modal" secondary onClick={hideModal}>
                    Cancel
                </Button>
                <Button
                    name={`delete-job-${id}`}
                    destructive
                    onClick={() => {
                        deleteJob(id)
                        hideModal()
                    }}
                >
                    Delete
                </Button>
            </ButtonStrip>
        </ModalActions>
    </Modal>
)

DumbDeleteJobModal.propTypes = {
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
)(DumbDeleteJobModal)
