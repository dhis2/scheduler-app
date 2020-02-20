import React from 'react'
import { func } from 'prop-types'
import {
    Button,
    Modal,
    ModalContent,
    ModalActions,
    ButtonStrip,
} from '@dhis2/ui-core'
import { connect } from 'react-redux'
import { actions as modalActions } from '../../data/modal'
import history from '../../services/history'

export const DumbDiscardFormModal = ({ hideModal }) => (
    <Modal open small onClose={hideModal}>
        <ModalContent>Are you sure you want to discard this form?</ModalContent>
        <ModalActions>
            <ButtonStrip end>
                <Button secondary onClick={hideModal}>
                    Cancel
                </Button>
                <Button
                    destructive
                    onClick={() => {
                        history.push('/')
                        hideModal()
                    }}
                >
                    Discard
                </Button>
            </ButtonStrip>
        </ModalActions>
    </Modal>
)

DumbDiscardFormModal.propTypes = {
    hideModal: func.isRequired,
}

const mapDispatchToProps = {
    hideModal: modalActions.hideModal,
}

export default connect(
    null,
    mapDispatchToProps
)(DumbDiscardFormModal)
