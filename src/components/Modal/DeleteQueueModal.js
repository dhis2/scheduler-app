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
import { useDataMutation } from '@dhis2/app-runtime'

const DeleteQueueModal = ({ name, hideModal, onSuccess }) => {
    const [deleteQueue] = useDataMutation({
        resource: `scheduler/queues/${name}`,
        type: 'delete',
    })

    return (
        <Modal open small onClose={hideModal}>
            <ModalContent>
                {i18n.t('Are you sure you want to delete this queue?')}
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button name="hide-modal" secondary onClick={hideModal}>
                        {i18n.t('Cancel')}
                    </Button>
                    <Button
                        name={`delete-queue-${name}`}
                        destructive
                        onClick={() => {
                            deleteQueue().then(() => {
                                hideModal()
                                onSuccess()
                            })
                        }}
                    >
                        {i18n.t('Delete')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

const { func, string } = PropTypes

DeleteQueueModal.propTypes = {
    hideModal: func.isRequired,
    name: string.isRequired,
    onSuccess: func.isRequired,
}

export default DeleteQueueModal
