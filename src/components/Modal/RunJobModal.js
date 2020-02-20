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

export const DumbRunJobModal = ({ id, hideModal, runJob }) => (
    <Modal open small onClose={hideModal}>
        <ModalContent>Are you sure you want to run this job?</ModalContent>
        <ModalActions>
            <ButtonStrip end>
                <Button secondary onClick={hideModal}>
                    Cancel
                </Button>
                <Button
                    primary
                    onClick={() => {
                        runJob(id)
                        hideModal()
                    }}
                >
                    Run
                </Button>
            </ButtonStrip>
        </ModalActions>
    </Modal>
)

DumbRunJobModal.propTypes = {
    id: string.isRequired,
    hideModal: func.isRequired,
    runJob: func.isRequired,
}

const mapDispatchToProps = {
    runJob: jobActions.runJob,
    hideModal: modalActions.hideModal,
}

export default connect(
    null,
    mapDispatchToProps
)(DumbRunJobModal)
