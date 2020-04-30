import React, { useContext } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import {
    Button,
    Modal,
    ModalContent,
    ModalActions,
    ButtonStrip,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { RefetchJobsContext } from '../Context'
import { useDeleteJob } from '../../hooks/jobs'

const DeleteJobModal = ({ id, hideModal }) => {
    const [deleteJob] = useDeleteJob()
    const refetch = useContext(RefetchJobsContext)

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
                                refetch()
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

DeleteJobModal.propTypes = {
    hideModal: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
}

export default DeleteJobModal
