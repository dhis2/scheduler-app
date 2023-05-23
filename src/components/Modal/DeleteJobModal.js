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

const mutation = {
    resource: 'jobConfigurations',
    id: /* istanbul ignore next */ ({ id }) => id,
    type: 'delete',
}

const DeleteJobModal = ({ id, hideModal, onSuccess }) => {
    const [deleteJob] = useDataMutation(mutation)

    return (
        <Modal open small onClose={hideModal}>
            <ModalContent>
                {i18n.t('Are you sure you want to delete this job?')}
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button name="hide-modal" secondary onClick={hideModal}>
                        {i18n.t('Cancel')}
                    </Button>
                    <Button
                        name={`delete-job-${id}`}
                        destructive
                        onClick={() => {
                            deleteJob({ id }).then(() => {
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

DeleteJobModal.propTypes = {
    hideModal: func.isRequired,
    id: string.isRequired,
    onSuccess: func.isRequired,
}

export default DeleteJobModal
