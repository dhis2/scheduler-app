import React, { useState } from 'react'
import { func } from 'prop-types'
import {
    Button,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Radio,
    RadioGroup,
} from '@dhis2/ui-core'

const cronPresets = [
    {
        label: 'Every hour',
        value: '0 0 * ? * *',
    },
    {
        label: 'Every day at midnight',
        value: '0 0 1 ? * *',
    },
    {
        label: 'Every day at 3 am',
        value: '0 0 3 ? * *',
    },
    {
        label: 'Every day at noon',
        value: '0 0 12 ? * MON-FRI',
    },
    {
        label: 'Every week',
        value: '0 0 3 ? * MON',
    },
]

const CronPresetModal = ({ setCron, hideModal }) => {
    const [currentPreset, setCurrentPreset] = useState('')

    return (
        <Modal open small onClose={hideModal}>
            <ModalTitle>Choose a preset time/interval</ModalTitle>
            <ModalContent>
                <RadioGroup
                    onChange={({ value }) => setCurrentPreset(value)}
                    value={currentPreset}
                >
                    {cronPresets.map(preset => (
                        <Radio {...preset} key={preset.value} />
                    ))}
                </RadioGroup>
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button secondary onClick={hideModal} name="hide-modal">
                        Cancel
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
                        Insert preset
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

CronPresetModal.propTypes = {
    hideModal: func.isRequired,
    setCron: func.isRequired,
}

export default CronPresetModal
