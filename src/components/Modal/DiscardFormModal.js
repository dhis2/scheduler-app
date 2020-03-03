import React from 'react'
import { func } from 'prop-types'
import {
    Button,
    Modal,
    ModalContent,
    ModalActions,
    ButtonStrip,
} from '@dhis2/ui-core'
import history from '../../services/history'

const DiscardFormModal = ({ hideModal }) => (
    <Modal open small onClose={hideModal}>
        <ModalContent>Are you sure you want to discard this form?</ModalContent>
        <ModalActions>
            <ButtonStrip end>
                <Button
                    name="cancel-discard-form"
                    secondary
                    onClick={hideModal}
                >
                    Cancel
                </Button>
                <Button
                    name="discard-form"
                    destructive
                    onClick={() => {
                        hideModal()
                        history.push('/')
                    }}
                >
                    Discard
                </Button>
            </ButtonStrip>
        </ModalActions>
    </Modal>
)

DiscardFormModal.propTypes = {
    hideModal: func.isRequired,
}

export default DiscardFormModal
