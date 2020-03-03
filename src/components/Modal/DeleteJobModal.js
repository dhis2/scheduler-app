import React, { useContext } from 'react'
import { func, string } from 'prop-types'
import {
    Button,
    Modal,
    ModalContent,
    ModalActions,
    ButtonStrip,
} from '@dhis2/ui-core'
import { RefetchJobsContext } from '../Context'
import { useDeleteJob } from '../../hooks/jobs'

const DeleteJobModal = ({ id, hideModal }) => {
    const [deleteJob] = useDeleteJob()
    const refetch = useContext(RefetchJobsContext)

    return (
        <Modal open small onClose={hideModal}>
            <ModalContent>
                Are you sure you want to delete this job?
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button name="hide-modal" secondary onClick={hideModal}>
                        Cancel
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
                        Delete
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

DeleteJobModal.propTypes = {
    hideModal: func.isRequired,
    id: string.isRequired,
}

export default DeleteJobModal
