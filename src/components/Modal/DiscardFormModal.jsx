import React from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import history from '../../services/history'

const DiscardFormModal = ({ hideModal }) => (
    <Modal open small onClose={hideModal}>
        <ModalTitle>{i18n.t('Discard unsaved changes?')}</ModalTitle>
        <ModalContent>
            {i18n.t(
                'This form has unsaved changes. Are you sure that you want to discard them?'
            )}
        </ModalContent>
        <ModalActions>
            <ButtonStrip end>
                <Button
                    name="cancel-discard-form"
                    secondary
                    onClick={hideModal}
                >
                    {i18n.t('No, keep changes')}
                </Button>
                <Button
                    name="discard-form"
                    destructive
                    onClick={() => {
                        hideModal()
                        history.push('/')
                    }}
                >
                    {i18n.t('Yes, discard changes')}
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
