import React, { useContext } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { useDataEngine } from '@dhis2/app-runtime'
import {
    Button,
    Modal,
    ModalContent,
    ModalActions,
    ButtonStrip,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { JobContext } from '../JobStore'

const RunJobModal = ({ id, hideModal }) => {
    const engine = useDataEngine()
    const query = {
        jobs: {
            resource: `jobConfigurations/${id}/execute`,
        },
    }
    const runJob = () => engine.query(query)
    const { refetch } = useContext(JobContext)

    return (
        <Modal open small onClose={hideModal}>
            <ModalContent>
                {i18n.t('Are you sure you want to run this job?')}
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button name="hide-modal" secondary onClick={hideModal}>
                        {i18n.t('Cancel')}
                    </Button>
                    <Button
                        name={`run-job-${id}`}
                        primary
                        onClick={() => {
                            runJob().then(() => {
                                hideModal()
                                refetch()
                            })
                        }}
                    >
                        {i18n.t('Run')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

const { func, string } = PropTypes

RunJobModal.propTypes = {
    hideModal: func.isRequired,
    id: string.isRequired,
}

export default RunJobModal
