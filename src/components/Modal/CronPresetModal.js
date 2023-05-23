import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Radio,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'

const cronPresets = [
    {
        label: i18n.t('Every hour'),
        value: '0 0 * ? * *',
    },
    {
        label: i18n.t('Every day at midnight'),
        value: '0 0 1 ? * *',
    },
    {
        label: i18n.t('Every day at 3 am'),
        value: '0 0 3 ? * *',
    },
    {
        label: i18n.t('Every day at noon'),
        value: '0 0 12 ? * MON-FRI',
    },
    {
        label: i18n.t('Every week'),
        value: '0 0 3 ? * MON',
    },
]

const CronPresetModal = ({ setCron, hideModal }) => {
    const [currentPreset, setCurrentPreset] = useState('')

    return (
        <Modal open small onClose={hideModal}>
            <ModalTitle>{i18n.t('Choose a preset time/interval')}</ModalTitle>
            <ModalContent>
                {cronPresets.map((preset) => (
                    <Radio
                        {...preset}
                        checked={currentPreset === preset.value}
                        key={preset.value}
                        onChange={({ value }) => setCurrentPreset(value)}
                    />
                ))}
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button secondary onClick={hideModal} name="hide-modal">
                        {i18n.t('Cancel')}
                    </Button>
                    <Button
                        primary
                        name="insert-preset"
                        disabled={!currentPreset}
                        onClick={() => {
                            hideModal()
                            setCron(currentPreset)
                        }}
                    >
                        {i18n.t('Insert preset')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

const { func } = PropTypes

CronPresetModal.propTypes = {
    hideModal: func.isRequired,
    setCron: func.isRequired,
}

export default CronPresetModal
