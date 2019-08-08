import React, { useState } from 'react'
import { func } from 'prop-types'
import { Button, Modal, ButtonStrip } from '@dhis2/ui-core'
import { connect } from 'react-redux'
import { RadioGroup } from '../Radios'
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
            <Modal.Title>Choose a preset time/interval</Modal.Title>
            <Modal.Content>
                <RadioGroup
                    name="cron-presets"
                    options={cronPresets}
                    selected={currentPreset}
                    setSelected={setCurrentPreset}
                />
            </Modal.Content>
            <Modal.Actions>
                <ButtonStrip end>
                    <Button secondary name="hide-modal" onClick={hideModal}>
                        Cancel
                    </Button>
                    <Button
                        primary
                        name="insert-preset"
                        disabled={!currentPreset}
                        onClick={() => {
                            setPreset(currentPreset)
                            hideModal()
                        }}
                    >
                        Insert preset
                    </Button>
                </ButtonStrip>
            </Modal.Actions>
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
