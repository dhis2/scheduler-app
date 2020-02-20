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
import { connect } from 'react-redux'
import { actions as modalActions } from '../../data/modal'
import { actions as presetActions } from '../../data/cron-preset'

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

export const DumbCronPresetModal = ({ setPreset, hideModal }) => {
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
                    <Button secondary onClick={hideModal}>
                        Cancel
                    </Button>
                    <Button
                        primary
                        disabled={!currentPreset}
                        onClick={() => {
                            setPreset(currentPreset)
                            hideModal()
                        }}
                    >
                        Insert preset
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

DumbCronPresetModal.propTypes = {
    hideModal: func.isRequired,
    setPreset: func.isRequired,
}

const mapDispatchToProps = {
    setPreset: presetActions.setPreset,
    hideModal: modalActions.hideModal,
}

export default connect(
    null,
    mapDispatchToProps
)(DumbCronPresetModal)
