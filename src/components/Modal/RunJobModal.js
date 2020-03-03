import React, { useContext } from 'react'
import { func, string } from 'prop-types'
import { useDataEngine } from '@dhis2/app-runtime'
import {
    Button,
    Modal,
    ModalContent,
    ModalActions,
    ButtonStrip,
} from '@dhis2/ui-core'
import { RefetchJobsContext } from '../Context'

const RunJobModal = ({ id, hideModal }) => {
    const engine = useDataEngine()
    const query = {
        jobs: {
            resource: `jobConfigurations/${id}/execute`,
        },
    }
    const runJob = () => engine.query(query)
    const refetch = useContext(RefetchJobsContext)

    return (
        <Modal open small onClose={hideModal}>
            <ModalContent>Are you sure you want to run this job?</ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button name="hide-modal" secondary onClick={hideModal}>
                        Cancel
                    </Button>
                    <Button
                        name={`run-job-${id}`}
                        primary
                        onClick={() => {
                            runJob({ id }).then(() => {
                                hideModal()
                                refetch()
                            })
                        }}
                    >
                        Run
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

RunJobModal.propTypes = {
    hideModal: func.isRequired,
    id: string.isRequired,
}

export default RunJobModal
