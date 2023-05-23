import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDataMutation } from '@dhis2/app-runtime'
import {
    Button,
    Modal,
    ModalContent,
    ModalActions,
    ButtonStrip,
    NoticeBox,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'

const RunJobModal = ({ id, hideModal, onComplete }) => {
    const [mutation] = useState({
        resource: `jobConfigurations/${id}/execute`,
        type: 'create',
    })
    const [runJob, { loading, error }] = useDataMutation(mutation, {
        onComplete: () => {
            hideModal()
            onComplete()
        },
    })

    return (
        <Modal open small onClose={hideModal}>
            <ModalContent>
                {error && (
                    <NoticeBox error title={i18n.t('Error running job')}>
                        {error.message}
                    </NoticeBox>
                )}
                <p>{i18n.t('Are you sure you want to run this job?')}</p>
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button
                        name="hide-modal"
                        secondary
                        onClick={hideModal}
                        disabled={loading}
                    >
                        {i18n.t('Cancel')}
                    </Button>
                    <Button
                        name={`run-job-${id}`}
                        primary
                        onClick={runJob}
                        loading={loading}
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
    onComplete: func.isRequired,
}

export default RunJobModal
