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

const messages = {
    error: {
        job: i18n.t('Error running job'),
        queue: i18n.t('Error running queue'),
    },
    confirm: {
        job: i18n.t('Are you sure you want to run this job?'),
        queue: i18n.t('Are you sure you want to run this queue?'),
    },
}

/**
 * This modal can be used to trigger a job or a queue. To start
 * a queue, pass the id of the first job of that queue.
 */

const RunJobModal = ({ id, hideModal, onComplete, isQueue }) => {
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
    const errorTitle = isQueue ? messages.error.queue : messages.error.job
    const confirmation = isQueue ? messages.confirm.queue : messages.confirm.job

    return (
        <Modal open small onClose={hideModal}>
            <ModalContent>
                {error && (
                    <NoticeBox error title={errorTitle}>
                        {error.message}
                    </NoticeBox>
                )}
                <p>{confirmation}</p>
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

const { func, string, bool } = PropTypes

RunJobModal.propTypes = {
    hideModal: func.isRequired,
    id: string.isRequired,
    onComplete: func.isRequired,
    isQueue: bool,
}

export default RunJobModal
