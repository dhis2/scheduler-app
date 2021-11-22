import React, { useState } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { useDataEngine } from '@dhis2/app-runtime'
import {
    Button,
    Modal,
    ModalContent,
    ModalActions,
    ButtonStrip,
    NoticeBox,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { hooks } from '../Store'

const RunJobModal = ({ id, hideModal }) => {
    const mutation = {
        resource: `jobConfigurations/${id}/execute`,
        type: 'create',
    }
    const refetchJobs = hooks.useRefetchJobs()
    const [mutating, setMutating] = useState(false)
    const [error, setError] = useState('')
    const engine = useDataEngine(mutation)

    const runJob = () => {
        setMutating(true)
        setError('')
        engine
            .mutate(mutation)
            .then(() => {
                setMutating(false)
                hideModal()
                refetchJobs()
            })
            .catch(e => {
                setMutating(false)
                setError(e.message || i18n.t('Something went wrong'))
            })
    }

    return (
        <Modal open small onClose={hideModal}>
            <ModalContent>
                {error && (
                    <NoticeBox error title={i18n.t('Error running job')}>
                        {error}
                    </NoticeBox>
                )}
                <p>{i18n.t('Are you sure you want to run this job?')}</p>
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button name="hide-modal" secondary onClick={hideModal}>
                        {i18n.t('Cancel')}
                    </Button>
                    <Button
                        name={`run-job-${id}`}
                        primary
                        onClick={runJob}
                        loading={mutating}
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
