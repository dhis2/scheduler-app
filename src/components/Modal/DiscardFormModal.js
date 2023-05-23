import React from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Modal,
    ModalContent,
    ModalActions,
    ButtonStrip,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import history from '../../services/history'

const DiscardFormModal = ({ hideModal }) => (
    <Modal open small onClose={hideModal}>
        <ModalContent>
            {i18n.t('Are you sure you want to discard this form?')}
        </ModalContent>
        <ModalActions>
            <ButtonStrip end>
                <Button
                    name="cancel-discard-form"
                    secondary
                    onClick={hideModal}
                >
                    {i18n.t('Cancel')}
                </Button>
                <Button
                    name="discard-form"
                    destructive
                    onClick={() => {
                        hideModal()
                        history.push('/')
                    }}
                >
                    {i18n.t('Discard')}
                </Button>
            </ButtonStrip>
        </ModalActions>
    </Modal>
)

const { func } = PropTypes

DiscardFormModal.propTypes = {
    hideModal: func.isRequired,
}

export default DiscardFormModal
