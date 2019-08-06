import React from 'react'
import { func } from 'prop-types'
import { Button, Modal, ButtonStrip } from '@dhis2/ui-core'
import { connect } from 'react-redux'
import { actions as modalActions } from '../../data/modal'
import history from '../../services/history'

export const DumbDiscardFormModal = ({ hideModal }) => (
    <Modal open small onClose={hideModal}>
        <Modal.Content>
            Are you sure you want to discard this form?
        </Modal.Content>
        <Modal.Actions>
            <ButtonStrip end>
                <Button
                    secondary
                    name="cancel-discard-form"
                    onClick={hideModal}
                >
                    Cancel
                </Button>
                <Button
                    destructive
                    name="discard-form"
                    onClick={() => {
                        history.push('/')
                        hideModal()
                    }}
                >
                    Discard
                </Button>
            </ButtonStrip>
        </Modal.Actions>
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
